const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  longDescription: {
    type: String,
    trim: true,
    maxlength: [2000, 'Long description cannot exceed 2000 characters']
  },
  technologies: [{
    type: String,
    required: true,
    trim: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'desktop', 'api', 'other'],
    default: 'web'
  },
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'completed', 'maintenance'],
    default: 'completed'
  },
  featured: {
    type: Boolean,
    default: false
  },
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  thumbnail: {
    type: String,
    required: [true, 'Project thumbnail is required']
  },
  githubUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https:\/\/github\.com\//.test(v)
      },
      message: 'Please provide a valid GitHub URL'
    }
  },
  liveUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\//.test(v)
      },
      message: 'Please provide a valid URL'
    }
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  client: {
    name: String,
    company: String,
    testimonial: String
  },
  challenges: [{
    type: String,
    trim: true
  }],
  solutions: [{
    type: String,
    trim: true
  }],
  lessons: [{
    type: String,
    trim: true
  }],
  metrics: {
    performanceImprovement: String,
    userSatisfaction: String,
    otherMetrics: [{
      name: String,
      value: String
    }]
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  seoTitle: {
    type: String,
    trim: true,
    maxlength: [60, 'SEO title cannot exceed 60 characters']
  },
  seoDescription: {
    type: String,
    trim: true,
    maxlength: [160, 'SEO description cannot exceed 160 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Virtual for project duration
projectSchema.virtual('duration').get(function() {
  if (!this.startDate) return null
  const end = this.endDate || new Date()
  const start = this.startDate
  const diffTime = Math.abs(end - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 30) {
    return `${diffDays} days`
  } else if (diffDays < 365) {
    const months = Math.ceil(diffDays / 30)
    return `${months} month${months > 1 ? 's' : ''}`
  } else {
    const years = Math.floor(diffDays / 365)
    const remainingMonths = Math.ceil((diffDays % 365) / 30)
    return `${years} year${years > 1 ? 's' : ''}${remainingMonths > 0 ? ` ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`
  }
})

// Create slug from title before saving
projectSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
  next()
})

// Indexes for better performance
projectSchema.index({ slug: 1 })
projectSchema.index({ category: 1 })
projectSchema.index({ featured: 1 })
projectSchema.index({ tags: 1 })
projectSchema.index({ createdAt: -1 })
projectSchema.index({ views: -1 })
projectSchema.index({ likes: -1 })

module.exports = mongoose.model('Project', projectSchema)