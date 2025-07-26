import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'

const Portfolio = () => {
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'E-commerce Moderne',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
      description: 'Boutique en ligne complète avec gestion des paiements et stocks',
      technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      link: '#',
      github: '#'
    },
    {
      id: 2,
      title: 'Application Mobile Fitness',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
      description: 'App de suivi fitness avec intégration wearables',
      technologies: ['React Native', 'Firebase', 'HealthKit'],
      link: '#',
      github: '#'
    },
    {
      id: 3,
      title: 'Dashboard Analytics',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
      description: 'Tableau de bord analytique pour entreprise',
      technologies: ['Vue.js', 'D3.js', 'Express', 'PostgreSQL'],
      link: '#',
      github: '#'
    },
    {
      id: 4,
      title: 'Site Vitrine Restaurant',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
      description: 'Site web élégant pour restaurant gastronomique',
      technologies: ['Next.js', 'Tailwind CSS', 'Sanity CMS'],
      link: '#',
      github: '#'
    },
    {
      id: 5,
      title: 'App de Livraison',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600',
      description: 'Application de livraison en temps réel',
      technologies: ['Flutter', 'Google Maps', 'Firebase'],
      link: '#',
      github: '#'
    },
    {
      id: 6,
      title: 'Plateforme SaaS',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600',
      description: 'Plateforme SaaS pour gestion d\'équipe',
      technologies: ['React', 'TypeScript', 'AWS', 'Stripe'],
      link: '#',
      github: '#'
    }
  ]

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'web', name: 'Web' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'design', name: 'Design' }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Notre <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos réalisations et laissez-vous inspirer par nos projets 
              qui allient créativité et performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  filter === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group overflow-hidden"
              >
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <a
                      href={project.link}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <a
                      href={project.github}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <a
                    href={project.link}
                    className="flex-1 btn-primary text-center text-sm"
                  >
                    Voir le projet
                  </a>
                  <a
                    href={project.github}
                    className="flex-1 btn-secondary text-center text-sm"
                  >
                    Code source
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Portfolio