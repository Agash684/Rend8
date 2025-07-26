import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

const Blog = () => {
  // Mock blog posts - in real app this would come from API
  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable React Applications",
      excerpt: "Learn best practices for structuring large React applications with proper state management and component architecture.",
      content: "Full blog post content would go here...",
      author: "Joshua",
      publishedAt: "2023-12-01",
      readTime: "8 min read",
      tags: ["React", "JavaScript", "Architecture"],
      featured: true
    },
    {
      id: 2,
      title: "The Future of Web Development",
      excerpt: "Exploring emerging trends and technologies that will shape the future of web development in the coming years.",
      content: "Full blog post content would go here...",
      author: "Joshua",
      publishedAt: "2023-11-15",
      readTime: "6 min read",
      tags: ["Web Development", "Trends", "Technology"],
      featured: false
    },
    {
      id: 3,
      title: "Optimizing Performance in Node.js",
      excerpt: "Tips and techniques for improving the performance of your Node.js applications and handling high traffic loads.",
      content: "Full blog post content would go here...",
      author: "Joshua",
      publishedAt: "2023-11-01",
      readTime: "10 min read",
      tags: ["Node.js", "Performance", "Backend"],
      featured: false
    }
  ]

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
            My <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Thoughts, tutorials, and insights about web development, technology, and the digital world. 
            I share what I learn and discover along my journey as a developer.
          </p>
        </motion.div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">🚧 Blog Coming Soon!</CardTitle>
              <CardDescription>
                I'm currently working on setting up my blog. In the meantime, check out some of the topics I'll be covering:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="space-y-2">
                  <h4 className="font-semibold">Technical Tutorials</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• React best practices</li>
                    <li>• Node.js performance tips</li>
                    <li>• Database optimization</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Industry Insights</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Web development trends</li>
                    <li>• Career advice</li>
                    <li>• Project case studies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Preview Posts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Preview Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                      {post.featured && (
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Newsletter Signup */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Stay Updated</CardTitle>
              <CardDescription>
                Get notified when I publish new blog posts and tutorials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                <Button>Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                No spam, unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}

export default Blog