import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Code, Palette, Smartphone, BarChart3, Globe, Zap, CheckCircle } from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Développement Web',
      description: 'Sites web modernes et applications web performantes',
      features: [
        'Sites web responsives',
        'Applications web complexes',
        'APIs et microservices',
        'Optimisation des performances',
        'Intégration de systèmes',
        'Tests et déploiement'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'Python', 'PHP', 'MySQL', 'MongoDB'],
      price: 'À partir de 2000€'
    },
    {
      icon: Palette,
      title: 'Design UI/UX',
      description: 'Interfaces utilisateur élégantes et expériences optimisées',
      features: [
        'Design System complet',
        'Prototypage interactif',
        'Tests utilisateurs',
        'Design responsive',
        'Accessibilité',
        'Branding et identité'
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'],
      price: 'À partir de 1500€'
    },
    {
      icon: Smartphone,
      title: 'Applications Mobiles',
      description: 'Applications natives et hybrides pour iOS et Android',
      features: [
        'Applications natives',
        'Applications hybrides',
        'PWA (Progressive Web Apps)',
        'Intégration API',
        'Push notifications',
        'Publication App Store'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      price: 'À partir de 3000€'
    },
    {
      icon: BarChart3,
      title: 'Marketing Digital',
      description: 'Stratégies marketing pour augmenter votre visibilité',
      features: [
        'SEO et référencement',
        'Campagnes Google Ads',
        'Marketing sur réseaux sociaux',
        'Email marketing',
        'Content marketing',
        'Analytics et reporting'
      ],
      technologies: ['Google Analytics', 'Facebook Ads', 'Mailchimp', 'HubSpot'],
      price: 'À partir de 800€'
    },
    {
      icon: Globe,
      title: 'E-commerce',
      description: 'Boutiques en ligne complètes et performantes',
      features: [
        'Boutiques en ligne',
        'Gestion des paiements',
        'Gestion des stocks',
        'Logistique et livraison',
        'Marketing e-commerce',
        'Support client'
      ],
      technologies: ['Shopify', 'WooCommerce', 'Magento', 'Stripe', 'PayPal'],
      price: 'À partir de 2500€'
    },
    {
      icon: Zap,
      title: 'Maintenance & Support',
      description: 'Services de maintenance continue et support technique',
      features: [
        'Monitoring 24/7',
        'Sauvegardes automatiques',
        'Mises à jour de sécurité',
        'Support technique',
        'Optimisation continue',
        'Formation utilisateurs'
      ],
      technologies: ['AWS', 'Google Cloud', 'Docker', 'Jenkins', 'Grafana'],
      price: 'À partir de 300€/mois'
    }
  ]

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
              Nos <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions digitales complètes pour transformer votre entreprise 
              et atteindre vos objectifs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="text-lg font-semibold text-primary-600">
                      {service.price}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Ce qui est inclus :</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Technologies utilisées :</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="btn-primary w-full text-center"
                >
                  Demander un devis
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Prêt à commencer votre projet ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.
            </p>
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center"
            >
              Commencer maintenant
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services