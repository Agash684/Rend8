const express = require('express')
const router = express.Router()
const Project = require('../models/Project')
const multer = require('multer')
const path = require('path')
const fs = require('fs').promises

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/projects')
    try {
      await fs.mkdir(uploadPath, { recursive: true })
      cb(null, uploadPath)
    } catch (error) {
      cb(error)
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  }
})

// GET /api/projects - Get all projects with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      featured,
      search,
      sort = '-createdAt',
      tags
    } = req.query

    // Build filter object
    const filter = { isPublic: true }
    
    if (category && category !== 'all') {
      filter.category = category
    }
    
    if (featured === 'true') {
      filter.featured = true
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } }
      ]
    }
    
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : tags.split(',')
      filter.tags = { $in: tagArray }
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)
    
    // Execute query
    const projects = await Project.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v')
    
    // Get total count for pagination
    const total = await Project.countDocuments(filter)
    
    // Get available categories and tags for filtering
    const categories = await Project.distinct('category', { isPublic: true })
    const availableTags = await Project.distinct('tags', { isPublic: true })

    res.json({
      success: true,
      data: projects,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      },
      filters: {
        categories,
        tags: availableTags
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    })
  }
})

// GET /api/projects/featured - Get featured projects
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ 
      featured: true, 
      isPublic: true 
    })
      .sort('-createdAt')
      .limit(6)
      .select('-__v')

    res.json({
      success: true,
      data: projects
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured projects',
      error: error.message
    })
  }
})

// GET /api/projects/stats - Get project statistics
router.get('/stats', async (req, res) => {
  try {
    const total = await Project.countDocuments({ isPublic: true })
    const featured = await Project.countDocuments({ featured: true, isPublic: true })
    const byCategory = await Project.aggregate([
      { $match: { isPublic: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ])
    const totalViews = await Project.aggregate([
      { $match: { isPublic: true } },
      { $group: { _id: null, total: { $sum: '$views' } } }
    ])

    res.json({
      success: true,
      data: {
        total,
        featured,
        byCategory,
        totalViews: totalViews[0]?.total || 0
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project statistics',
      error: error.message
    })
  }
})

// GET /api/projects/:slug - Get single project by slug
router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ 
      slug: req.params.slug,
      isPublic: true 
    }).select('-__v')

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    // Increment view count
    await Project.findByIdAndUpdate(project._id, { $inc: { views: 1 } })

    res.json({
      success: true,
      data: project
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    })
  }
})

// POST /api/projects - Create new project (protected route - would need auth middleware)
router.post('/', upload.single('thumbnail'), async (req, res) => {
  try {
    const projectData = { ...req.body }
    
    // Parse arrays from form data
    if (projectData.technologies) {
      projectData.technologies = JSON.parse(projectData.technologies)
    }
    if (projectData.tags) {
      projectData.tags = JSON.parse(projectData.tags)
    }
    if (projectData.challenges) {
      projectData.challenges = JSON.parse(projectData.challenges)
    }
    if (projectData.solutions) {
      projectData.solutions = JSON.parse(projectData.solutions)
    }

    // Handle thumbnail upload
    if (req.file) {
      projectData.thumbnail = `/uploads/projects/${req.file.filename}`
    }

    const project = new Project(projectData)
    await project.save()

    res.status(201).json({
      success: true,
      data: project,
      message: 'Project created successfully'
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    })
  }
})

// PUT /api/projects/:id - Update project (protected route - would need auth middleware)
router.put('/:id', upload.single('thumbnail'), async (req, res) => {
  try {
    const projectData = { ...req.body }
    
    // Parse arrays from form data
    if (projectData.technologies) {
      projectData.technologies = JSON.parse(projectData.technologies)
    }
    if (projectData.tags) {
      projectData.tags = JSON.parse(projectData.tags)
    }

    // Handle thumbnail upload
    if (req.file) {
      projectData.thumbnail = `/uploads/projects/${req.file.filename}`
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      projectData,
      { new: true, runValidators: true }
    )

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    res.json({
      success: true,
      data: project,
      message: 'Project updated successfully'
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    })
  }
})

// DELETE /api/projects/:id - Delete project (protected route - would need auth middleware)
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    })
  }
})

// POST /api/projects/:id/like - Like a project
router.post('/:id/like', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    )

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    res.json({
      success: true,
      data: { likes: project.likes },
      message: 'Project liked successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error liking project',
      error: error.message
    })
  }
})

module.exports = router