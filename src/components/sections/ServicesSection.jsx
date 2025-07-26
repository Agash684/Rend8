import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Code, Palette, Smartphone, BarChart3, Globe, Zap } from 'lucide-react'

const ServicesSection = () => {
  const services = [
    {
      icon: Code,
      title: 'Développement Web',
      description: 'Sites web modernes et applications web performantes avec les dernières technologies.',
      features: ['React & Next.js', 'Node.js & Express', 'Bases de données', 'APIs RESTful'],
      price: 'À partir de 2000€'
    },
    {
      icon: Palette,
      title: 'Design UI/UX',
      description: 'Interfaces utilisateur élégantes et expériences utilisateur optimisées.',
      features: ['Design System', 'Prototypage', 'Tests utilisateurs', 'Responsive Design'],
      price: 'À partir de 1500€'
    },
    {
      icon: Smartphone,
      title: 'Applications Mobiles',
      description: 'Applications natives et hybrides pour iOS et Android.',
      features: ['React Native', 'Flutter', 'iOS & Android', 'App Store'],
      price: 'À partir de 3000€'
    },
    {
      icon: BarChart3,
      title: 'Marketing Digital',
      description: 'Stratégies marketing digital pour augmenter votre visibilité en ligne.',
      features: ['SEO & SEM', 'Réseaux sociaux', 'Email marketing', 'Analytics'],
      price: 'À partir de 800€'
    },
    {
      icon: Globe,
      title: 'E-commerce',
      description: 'Boutiques en ligne complètes avec gestion des paiements et stocks.',
      features: ['Shopify & WooCommerce', 'Paiements sécurisés', 'Gestion des stocks', 'Logistique'],
      price: 'À partir de 2500€'
    },
    {
      icon: Zap,
      title: 'Maintenance & Support',
      description: 'Services de maintenance continue et support technique 24/7.',
      features: ['Monitoring 24/7', 'Sauvegardes', 'Mises à jour', 'Support technique'],
      price: 'À partir de 300€/mois'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Nos Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des solutions complètes pour tous vos besoins digitaux, 
            de la conception à la maintenance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card group hover:transform hover:scale-105"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                <service.icon className="w-8 h-8 text-primary-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-primary-600">
                  {service.price}
                </span>
                <Link
                  to="/contact"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm group-hover:underline"
                >
                  En savoir plus →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            to="/services"
            className="btn-primary inline-flex items-center"
          >
            Voir tous nos services
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection