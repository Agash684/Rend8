import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Users, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  Settings,
  Upload,
  Save,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { useToast } from '../components/ui/toaster'

// Mock data for dashboard
const mockStats = {
  totalViews: 12543,
  totalProjects: 8,
  totalMessages: 47,
  monthlyGrowth: 23.5
}

const mockRecentProjects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    status: 'completed',
    views: 1234,
    createdAt: '2024-01-15',
    featured: true
  },
  {
    id: 2,
    title: 'Task Management App',
    status: 'in-progress',
    views: 856,
    createdAt: '2024-01-10',
    featured: false
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    status: 'completed',
    views: 2341,
    createdAt: '2024-01-05',
    featured: true
  }
]

const mockRecentMessages = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    subject: 'Project Collaboration',
    message: 'I would love to discuss a potential project...',
    createdAt: '2024-01-20',
    read: false
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike@example.com',
    subject: 'Freelance Opportunity',
    message: 'We have an exciting opportunity...',
    createdAt: '2024-01-19',
    read: true
  }
]

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [projects, setProjects] = useState(mockRecentProjects)
  const [messages, setMessages] = useState(mockRecentMessages)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id))
    toast({
      title: "Project deleted",
      description: "The project has been successfully deleted.",
    })
  }

  const handleToggleFeatured = (id) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    ))
    toast({
      title: "Project updated",
      description: "Featured status has been updated.",
    })
  }

  const handleMarkAsRead = (id) => {
    setMessages(messages.map(m => 
      m.id === id ? { ...m, read: true } : m
    ))
  }

  const StatCard = ({ title, value, icon: Icon, trend, color = "blue" }) => (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <p className={`text-sm flex items-center mt-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className="h-4 w-4 mr-1" />
                {trend > 0 ? '+' : ''}{trend}%
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/20`}>
            <Icon className={`h-6 w-6 text-${color}-600 dark:text-${color}-400`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const ProjectRow = ({ project }) => (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h3 className="font-medium">{project.title}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            project.status === 'completed' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : project.status === 'in-progress'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
          }`}>
            {project.status}
          </span>
          {project.featured && (
            <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
              Featured
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {project.views} views
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleToggleFeatured(project.id)}
        >
          {project.featured ? 'Unfeature' : 'Feature'}
        </Button>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleDeleteProject(project.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const MessageRow = ({ message }) => (
    <div 
      className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
        !message.read ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800' : ''
      }`}
      onClick={() => handleMarkAsRead(message.id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`font-medium ${!message.read ? 'font-semibold' : ''}`}>
              {message.name}
            </h3>
            {!message.read && (
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{message.email}</p>
          <p className="font-medium mt-2">{message.subject}</p>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {message.message}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {new Date(message.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your portfolio and track your performance
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'projects', label: 'Projects' },
            { id: 'messages', label: 'Messages' },
            { id: 'settings', label: 'Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Views"
                value={mockStats.totalViews.toLocaleString()}
                icon={Eye}
                trend={mockStats.monthlyGrowth}
                color="blue"
              />
              <StatCard
                title="Projects"
                value={mockStats.totalProjects}
                icon={BarChart3}
                color="green"
              />
              <StatCard
                title="Messages"
                value={mockStats.totalMessages}
                icon={MessageSquare}
                color="purple"
              />
              <StatCard
                title="Growth"
                value={`${mockStats.monthlyGrowth}%`}
                icon={TrendingUp}
                trend={mockStats.monthlyGrowth}
                color="orange"
              />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Projects</CardTitle>
                  <CardDescription>Your latest project updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockRecentProjects.slice(0, 3).map((project) => (
                    <div key={project.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {project.views} views • {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>Latest contact form submissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockRecentMessages.slice(0, 3).map((message) => (
                    <div key={message.id} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        message.read ? 'bg-gray-300' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium">{message.name}</p>
                        <p className="text-sm text-muted-foreground">{message.subject}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Projects Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Projects</h2>
                <p className="text-muted-foreground">Manage your portfolio projects</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Project
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
              {projects.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Messages Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Messages</h2>
                <p className="text-muted-foreground">Contact form submissions</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {messages.filter(m => !m.read).length} unread
                </span>
              </div>
            </div>

            {/* Messages List */}
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageRow key={message.id} message={message} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold">Settings</h2>
              <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <input
                      type="text"
                      defaultValue="Joshua"
                      className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      defaultValue="joshua@example.com"
                      className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Bio</label>
                    <textarea
                      rows={3}
                      defaultValue="Full-stack developer passionate about creating amazing web experiences."
                      className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
                    />
                  </div>
                  <Button className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                  <CardDescription>Configure your portfolio website</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Site Title</label>
                    <input
                      type="text"
                      defaultValue="Joshua's Portfolio"
                      className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Site Description</label>
                    <input
                      type="text"
                      defaultValue="Full-Stack Developer & Designer"
                      className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maintenance Mode</p>
                      <p className="text-sm text-muted-foreground">
                        Enable to show maintenance page to visitors
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <Button className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Dashboard