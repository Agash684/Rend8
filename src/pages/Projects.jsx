import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, Github, ExternalLink, Heart, Eye } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTech, setSelectedTech] = useState('all')

  // Mock data - in real app this would come from API
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.",
      longDescription: "Built with React, Node.js, and MongoDB. Features include user authentication, shopping cart, payment processing with Stripe, order management, and comprehensive admin panel.",
      image: "/api/placeholder/600/400",
      category: "web",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      githubUrl: "https://github.com/joshua/ecommerce",
      liveUrl: "https://ecommerce-demo.com",
      featured: true,
      likes: 45,
      views: 1200,
      status: "completed",
      startDate: "2023-01-15",
      endDate: "2023-04-20"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team features.",
      longDescription: "Real-time collaboration tool built with React and Socket.io. Features drag-and-drop kanban boards, team collaboration, file attachments, and progress tracking.",
      image: "/api/placeholder/600/400",
      category: "web",
      technologies: ["React", "Socket.io", "Express", "PostgreSQL", "Material-UI"],
      githubUrl: "https://github.com/joshua/taskmanager",
      liveUrl: "https://taskmanager-demo.com",
      featured: true,
      likes: 32,
      views: 890,
      status: "completed",
      startDate: "2023-05-01",
      endDate: "2023-07-15"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A beautiful weather dashboard with forecasts, maps, and location-based recommendations.",
      longDescription: "Interactive weather application using OpenWeather API. Features include current conditions, 7-day forecasts, interactive maps, and location-based recommendations.",
      image: "/api/placeholder/600/400",
      category: "web",
      technologies: ["React", "OpenWeather API", "Chart.js", "Mapbox", "SCSS"],
      githubUrl: "https://github.com/joshua/weather",
      liveUrl: "https://weather-demo.com",
      featured: false,
      likes: 28,
      views: 650,
      status: "completed",
      startDate: "2023-08-01",
      endDate: "2023-09-10"
    },
    {
      id: 4,
      title: "Mobile Fitness App",
      description: "React Native fitness tracking app with workout plans and progress monitoring.",
      longDescription: "Cross-platform mobile app for fitness enthusiasts. Includes workout tracking, custom exercise plans, progress analytics, and social features.",
      image: "/api/placeholder/600/400",
      category: "mobile",
      technologies: ["React Native", "Firebase", "Redux", "Expo"],
      githubUrl: "https://github.com/joshua/fitness-app",
      liveUrl: "https://play.google.com/store/apps/fitness-tracker",
      featured: true,
      likes: 67,
      views: 1500,
      status: "completed",
      startDate: "2023-02-01",
      endDate: "2023-06-30"
    },
    {
      id: 5,
      title: "Portfolio CMS",
      description: "Content management system for portfolio websites with drag-and-drop editor.",
      longDescription: "Custom CMS built for creative professionals. Features include drag-and-drop page builder, image optimization, SEO tools, and client management.",
      image: "/api/placeholder/600/400",
      category: "web",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "AWS S3", "Stripe"],
      githubUrl: "https://github.com/joshua/portfolio-cms",
      liveUrl: "https://portfolio-cms-demo.com",
      featured: false,
      likes: 19,
      views: 420,
      status: "in-progress",
      startDate: "2023-10-01",
      endDate: null
    },
    {
      id: 6,
      title: "AI Chat Assistant",
      description: "Intelligent chatbot with natural language processing and learning capabilities.",
      longDescription: "AI-powered chat assistant using OpenAI API. Features include context awareness, multi-language support, and integration with various platforms.",
      image: "/api/placeholder/600/400",
      category: "api",
      technologies: ["Python", "FastAPI", "OpenAI", "Redis", "Docker"],
      githubUrl: "https://github.com/joshua/ai-assistant",
      liveUrl: "https://ai-assistant-demo.com",
      featured: true,
      likes: 89,
      views: 2100,
      status: "completed",
      startDate: "2023-09-15",
      endDate: "2023-11-20"
    }
  ]

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'web', label: 'Web Apps' },
    { value: 'mobile', label: 'Mobile Apps' },
    { value: 'api', label: 'APIs' },
    { value: 'desktop', label: 'Desktop' },
    { value: 'other', label: 'Other' }
  ]

  const technologies = [
    'all', 'React', 'Node.js', 'MongoDB', 'PostgreSQL', 'Python', 'TypeScript', 
    'Next.js', 'React Native', 'Vue.js', 'Express', 'FastAPI', 'AWS', 'Docker'
  ]

  // Filter projects based on search and filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesTech = selectedTech === 'all' || project.technologies.includes(selectedTech)
    
    return matchesSearch && matchesCategory && matchesTech
  })

  const featuredProjects = filteredProjects.filter(project => project.featured)
  const regularProjects = filteredProjects.filter(project => !project.featured)

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'in-progress': return 'bg-yellow-500'
      case 'planning': return 'bg-blue-500'
      case 'maintenance': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const ProjectCard = ({ project, featured = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={featured ? 'md:col-span-2' : ''}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden">
        <div className={`aspect-video bg-muted relative overflow-hidden ${featured ? 'md:aspect-[2/1]' : ''}`}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex space-x-2">
              <Button size="sm" variant="secondary" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button size="sm" variant="secondary" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          
          {/* Status badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-2 py-1 text-xs text-white rounded-full ${getStatusColor(project.status)}`}>
              {project.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>
          
          {/* Featured badge */}
          {featured && (
            <div className="absolute top-4 right-4">
              <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
                FEATURED
              </span>
            </div>
          )}
        </div>
        
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="group-hover:text-primary transition-colors">
                {project.title}
              </CardTitle>
              <CardDescription className="mt-2">
                {project.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md hover:bg-primary/20 transition-colors cursor-pointer"
                onClick={() => setSelectedTech(tech)}
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{project.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{project.likes}</span>
              </div>
            </div>
            <div className="text-xs">
              {new Date(project.startDate).getFullYear()}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Here's a collection of projects I've worked on, ranging from web applications 
            to mobile apps and APIs. Each project represents a unique challenge and learning experience.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* Technology Filter */}
            <select
              className="px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
            >
              {technologies.map(tech => (
                <option key={tech} value={tech}>
                  {tech === 'all' ? 'All Technologies' : tech}
                </option>
              ))}
            </select>
          </div>

          {/* Results count */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          </motion.section>
        )}

        {/* All Projects */}
        {regularProjects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">
              {featuredProjects.length > 0 ? 'Other Projects' : 'All Projects'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </motion.section>
        )}

        {/* No results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-4">No projects found</h3>
            <p className="text-muted-foreground mb-8">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedTech('all')
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center py-20"
        >
          <h2 className="text-3xl font-bold mb-4">
            Interested in Working Together?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always excited to take on new challenges and create amazing digital experiences.
          </p>
          <Button size="lg" variant="gradient" asChild>
            <Link to="/contact">
              Start a Project
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.section>
      </div>
    </div>
  )
}

export default Projects