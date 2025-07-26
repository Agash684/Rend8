const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const rateLimit = require('express-rate-limit')

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: {
    success: false,
    message: 'Too many contact form submissions, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// Validation middleware
const validateContactForm = (req, res, next) => {
  const { name, email, subject, message } = req.body

  // Check required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
      errors: {
        name: !name ? 'Name is required' : null,
        email: !email ? 'Email is required' : null,
        subject: !subject ? 'Subject is required' : null,
        message: !message ? 'Message is required' : null,
      }
    })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    })
  }

  // Validate field lengths
  if (name.length > 100) {
    return res.status(400).json({
      success: false,
      message: 'Name must be less than 100 characters'
    })
  }

  if (subject.length > 200) {
    return res.status(400).json({
      success: false,
      message: 'Subject must be less than 200 characters'
    })
  }

  if (message.length > 2000) {
    return res.status(400).json({
      success: false,
      message: 'Message must be less than 2000 characters'
    })
  }

  // Basic spam detection
  const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations', 'click here', 'free money']
  const messageText = message.toLowerCase()
  const hasSpam = spamKeywords.some(keyword => messageText.includes(keyword))
  
  if (hasSpam) {
    return res.status(400).json({
      success: false,
      message: 'Message contains prohibited content'
    })
  }

  next()
}

// POST /api/contact - Send contact form email
router.post('/', contactLimiter, validateContactForm, async (req, res) => {
  try {
    const { name, email, subject, message, phone, company } = req.body

    // Create email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <hr>
      <p style="color: #666; font-size: 12px;">
        This email was sent from the contact form on your portfolio website.
        <br>Sender IP: ${req.ip}
        <br>Timestamp: ${new Date().toISOString()}
      </p>
    `

    const transporter = createTransporter()

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM,
      subject: `Portfolio Contact: ${subject}`,
      html: emailContent,
      replyTo: email
    }

    // Auto-reply to sender
    const autoReplyContent = `
      <h2>Thank you for contacting me!</h2>
      <p>Hi ${name},</p>
      <p>Thank you for reaching out through my portfolio website. I have received your message and will get back to you as soon as possible.</p>
      <p><strong>Your message:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        <strong>Subject:</strong> ${subject}<br><br>
        ${message.replace(/\n/g, '<br>')}
      </div>
      <p>Best regards,<br>Joshua</p>
      <hr>
      <p style="color: #666; font-size: 12px;">
        This is an automated response. Please do not reply to this email.
      </p>
    `

    const autoReplyOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Thank you for your message - Joshua\'s Portfolio',
      html: autoReplyContent
    }

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(autoReplyOptions)
    ])

    res.json({
      success: true,
      message: 'Your message has been sent successfully! I\'ll get back to you soon.'
    })

  } catch (error) {
    console.error('Contact form error:', error)
    
    // Don't expose internal errors to client
    res.status(500).json({
      success: false,
      message: 'There was an error sending your message. Please try again later or contact me directly.'
    })
  }
})

// GET /api/contact/info - Get contact information
router.get('/info', (req, res) => {
  res.json({
    success: true,
    data: {
      email: 'joshua@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      social: {
        github: 'https://github.com/joshua',
        linkedin: 'https://linkedin.com/in/joshua',
        twitter: 'https://twitter.com/joshua'
      },
      availability: {
        status: 'available', // available, busy, unavailable
        message: 'Currently available for new projects'
      }
    }
  })
})

// POST /api/contact/subscribe - Newsletter subscription
router.post('/subscribe', rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: {
    success: false,
    message: 'Too many subscription attempts, please try again later.'
  }
}), async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      })
    }

    // Here you would typically save to a newsletter database
    // For now, we'll just send a confirmation email

    const transporter = createTransporter()
    
    const confirmationEmail = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Welcome to Joshua\'s Newsletter!',
      html: `
        <h2>Welcome to my newsletter!</h2>
        <p>Thank you for subscribing to my newsletter. You'll receive updates about:</p>
        <ul>
          <li>New projects and case studies</li>
          <li>Web development tips and tutorials</li>
          <li>Industry insights and trends</li>
          <li>Behind-the-scenes content</li>
        </ul>
        <p>You can unsubscribe at any time by replying to any newsletter email.</p>
        <p>Best regards,<br>Joshua</p>
      `
    }

    await transporter.sendMail(confirmationEmail)

    res.json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.'
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    res.status(500).json({
      success: false,
      message: 'There was an error processing your subscription. Please try again later.'
    })
  }
})

module.exports = router