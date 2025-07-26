import express from 'express'
import bcrypt from 'bcryptjs'
import { protect, generateToken } from '../middleware/auth.js'

const router = express.Router()

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const users = req.users
    const nextId = req.nextId

    // Check if user exists
    const userExists = users.find(user => user.email === email)
    if (userExists) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = {
      _id: nextId,
      name,
      email,
      password: hashedPassword,
      bio: '',
      location: '',
      avatar: '',
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    users.push(user)
    req.setNextId(nextId + 1)
    req.setUsers(users)

    // Remove password from response
    const { password: _, ...userResponse } = user

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: userResponse
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const users = req.users

    // Check for user
    const user = users.find(u => u.email === email)
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' })
    }

    // Update last login
    user.lastLogin = new Date()
    req.setUsers(users)

    // Remove password from response
    const { password: _, ...userResponse } = user

    res.json({
      success: true,
      token: generateToken(user._id),
      user: userResponse
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, email, bio, location } = req.body
    const users = req.users

    // Check if email is already taken by another user
    if (email && email !== req.user.email) {
      const emailExists = users.find(u => u.email === email && u._id !== req.user._id)
      if (emailExists) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' })
      }
    }

    // Find and update user
    const userIndex = users.findIndex(u => u._id === req.user._id)
    if (userIndex === -1) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' })
    }

    users[userIndex] = {
      ...users[userIndex],
      name: name || users[userIndex].name,
      email: email || users[userIndex].email,
      bio: bio !== undefined ? bio : users[userIndex].bio,
      location: location !== undefined ? location : users[userIndex].location,
      updatedAt: new Date()
    }

    req.setUsers(users)

    const { password: _, ...updatedUser } = users[userIndex]

    res.json({
      success: true,
      user: updatedUser
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

export default router