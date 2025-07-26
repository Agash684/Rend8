import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// In-memory database for development
let users = []
let nextId = 1

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Share database with routes
app.use((req, res, next) => {
  req.users = users
  req.nextId = nextId
  req.setNextId = (id) => { nextId = id }
  req.setUsers = (newUsers) => { users = newUsers }
  next()
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Error handling middleware
app.use(errorHandler)

// Start server without MongoDB dependency
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log('Note: Using in-memory database for development')
})

export default app