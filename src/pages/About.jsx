import React from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Code2, 
  Palette, 
  Database, 
  Globe, 
  Users, 
  Award,
  Calendar,
  MapPin,
  Mail
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

const About = () => {
  const skills = [
    {
      category: "Frontend",
      icon: Globe,
      technologies: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Vue.js", level: 80 },
        { name: "SASS/SCSS", level: 90 }
      ]
    },
    {
      category: "Backend",
      icon: Database,
      technologies: [
        { name: "Node.js", level: 90 },
        { name: "Express.js", level: 95 },
        { name: "MongoDB", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "GraphQL", level: 75 },
        { name: "REST APIs", level: 95 }
      ]
    },
    {
      category: "Tools & Others",
      icon: Code2,
      technologies: [
        { name: "Git", level: 95 },
        { name: "Docker", level: 80 },
        { name: "AWS", level: 75 },
        { name: "Figma", level: 85 },
        { name: "Jest", level: 80 },
        { name: "Webpack", level: 75 }
      ]
    }
  ]

  const experience = [
    {
      title: "Senior Full-Stack Developer",
      company: "TechCorp Solutions",
      period: "2022 - Present",
      description: "Leading development of enterprise web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting scalable solutions."
    },
    {
      title: "Full-Stack Developer",
      company: "Digital Agency Pro",
      period: "2020 - 2022",
      description: "Developed custom web applications and e-commerce platforms for various clients. Collaborated with design teams to create pixel-perfect implementations."
    },
    {
      title: "Frontend Developer",
      company: "StartupXYZ",
      period: "2019 - 2020",
      description: "Built responsive web applications using React and modern CSS frameworks. Implemented complex UI components and optimized application performance."
    }
  ]

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      period: "2015 - 2019",
      description: "Focused on software engineering, algorithms, and web technologies. Graduated with honors."
    }
  ]

  const achievements = [
    "🏆 AWS Certified Solutions Architect",
    "🎯 Led team of 5 developers on major e-commerce project",
    "📈 Improved application performance by 40% through optimization",
    "🚀 Built and deployed 20+ production applications",
    "👥 Mentored 10+ junior developers",
    "💡 Speaker at 3 tech conferences"
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm a passionate full-stack developer with over 3 years of experience creating 
            digital solutions that make a difference. I love turning complex problems into 
            simple, beautiful, and intuitive designs.
          </p>
        </motion.div>

        {/* Personal Info Section */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h2 className="text-3xl font-bold mb-6">My Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                My journey into web development started during my college years when I built my first 
                website for a local business. The excitement of seeing my code come to life in the 
                browser sparked a passion that has only grown stronger over the years.
              </p>
              <p>
                After graduating with a Computer Science degree from UC Berkeley, I dove headfirst 
                into the world of modern web development. I've had the privilege of working with 
                startups, agencies, and enterprise companies, each experience teaching me something new.
              </p>
              <p>
                What drives me most is the ability to create solutions that genuinely help people. 
                Whether it's building an e-commerce platform that helps a small business grow or 
                developing a complex dashboard that streamlines workflows, I find joy in crafting 
                digital experiences that make a positive impact.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community through 
                blog posts and speaking at conferences.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Quick Facts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>3+ Years Experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>joshua@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span>AWS Certified</span>
                </div>
                <Button className="w-full mt-6" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => {
              const Icon = skillGroup.icon
              return (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{skillGroup.category}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {skillGroup.technologies.map((tech) => (
                        <div key={tech.name}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{tech.name}</span>
                            <span className="text-sm text-muted-foreground">{tech.level}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <motion.div
                              className="bg-primary h-2 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${tech.level}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription className="text-primary font-medium">
                          {job.company}
                        </CardDescription>
                      </div>
                      <span className="text-sm text-muted-foreground mt-2 md:mt-0">
                        {job.period}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{job.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Education</h2>
          <div className="max-w-3xl mx-auto">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle>{edu.degree}</CardTitle>
                        <CardDescription className="text-primary font-medium">
                          {edu.school}
                        </CardDescription>
                      </div>
                      <span className="text-sm text-muted-foreground mt-2 md:mt-0">
                        {edu.period}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{edu.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Achievements Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Achievements</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <span className="text-2xl">{achievement.split(' ')[0]}</span>
                  <span className="text-muted-foreground">
                    {achievement.split(' ').slice(1).join(' ')}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default About