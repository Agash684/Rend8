import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Bienvenue sur CCACA</h1>
          <p>Une application moderne et fonctionnelle construite avec React et Node.js</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn">
              Commencer maintenant
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '80px 20px' }}>
        <div className="grid">
          <div className="card">
            <h3>🚀 Performance</h3>
            <p>Application optimisée pour des performances maximales avec React et Vite.</p>
          </div>
          <div className="card">
            <h3>🔒 Sécurité</h3>
            <p>Système d'authentification sécurisé avec JWT et bcrypt.</p>
          </div>
          <div className="card">
            <h3>📱 Responsive</h3>
            <p>Design adaptatif qui fonctionne parfaitement sur tous les appareils.</p>
          </div>
          <div className="card">
            <h3>⚡ Moderne</h3>
            <p>Technologies de pointe : React 18, Node.js, Express, MongoDB.</p>
          </div>
          <div className="card">
            <h3>🎨 Design</h3>
            <p>Interface utilisateur moderne avec des animations fluides.</p>
          </div>
          <div className="card">
            <h3>🔧 Fonctionnel</h3>
            <p>Backend complet avec API REST et gestion des données.</p>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div className="card">
          <h2>Fonctionnalités principales</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginTop: '32px' }}>
            <div>
              <h4>👤 Authentification</h4>
              <p>Inscription et connexion sécurisées</p>
            </div>
            <div>
              <h4>📊 Tableau de bord</h4>
              <p>Interface personnalisée pour chaque utilisateur</p>
            </div>
            <div>
              <h4>👤 Profil utilisateur</h4>
              <p>Gestion et modification des informations personnelles</p>
            </div>
            <div>
              <h4>🔐 Sécurité</h4>
              <p>Protection des routes et validation des données</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home