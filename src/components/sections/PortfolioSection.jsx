import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'

const PortfolioSection = () => {
  const projects = [
    {
      title: 'E-commerce Moderne',
      category: 'Web',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
      description: 'Boutique en ligne complète avec gestion des paiements'
    },
    {
      title: 'App Mobile Fitness',
      category: 'Mobile',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
      description: 'Application de suivi fitness avec intégration wearables'
    },
    {
      title: 'Dashboard Analytics',
      category: 'Web',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
      description: 'Tableau de bord analytique pour entreprise'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Nos Réalisations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez quelques-uns de nos projets récents qui démontrent 
            notre expertise et notre créativité.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card group overflow-hidden"
            >
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-primary-600">
                  {project.category}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {project.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <Link
            to="/portfolio"
            className="btn-primary inline-flex items-center"
          >
            Voir tous nos projets
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default PortfolioSection