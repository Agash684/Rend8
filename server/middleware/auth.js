import jwt from 'jsonwebtoken'

export const protect = async (req, res, next) => {
  try {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé, token manquant' })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    
    // Get user from token using shared database
    const user = req.users.find(u => u._id === decoded.id)
    
    if (!user) {
      return res.status(401).json({ message: 'Token invalide' })
    }

    if (!user.isActive) {
      return res.status(401).json({ message: 'Compte désactivé' })
    }

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user
    req.user = userWithoutPassword
    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(401).json({ message: 'Token invalide' })
  }
}

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d'
  })
}