import express from 'express'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// @desc    Get all users (public info only)
// @route   GET /api/users
// @access  Public
router.get('/', (req, res) => {
  try {
    const users = req.users
    const publicUsers = users
      .filter(user => user.isActive)
      .map(user => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        location: user.location,
        createdAt: user.createdAt
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10)

    res.json({
      success: true,
      count: publicUsers.length,
      users: publicUsers
    })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
router.get('/:id', (req, res) => {
  try {
    const users = req.users
    const user = users.find(u => u._id === parseInt(req.params.id))
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' })
    }

    const publicUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      location: user.location,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    }

    res.json({
      success: true,
      user: publicUser
    })
  } catch (error) {
    console.error('Get user by ID error:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// @desc    Get user stats
// @route   GET /api/users/stats
// @access  Private
router.get('/stats', protect, (req, res) => {
  try {
    const users = req.users
    const totalUsers = users.filter(user => user.isActive).length
    const activeUsers = users.filter(user => {
      if (!user.isActive) return false
      const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000)
      return new Date(user.lastLogin) >= last24Hours
    }).length

    res.json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        engagementRate: totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0
      }
    })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

export default router