import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const Dashboard = () => {
  const { user, loading } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalPosts: 0,
    recentActivity: []
  })

  useEffect(() => {
    if (user) {
      // Simuler des données de statistiques
      setStats({
        totalUsers: 1250,
        activeUsers: 847,
        totalPosts: 3420,
        recentActivity: [
          { id: 1, action: 'Nouveau utilisateur inscrit', time: 'Il y a 5 minutes' },
          { id: 2, action: 'Post créé', time: 'Il y a 15 minutes' },
          { id: 3, action: 'Commentaire ajouté', time: 'Il y a 1 heure' },
          { id: 4, action: 'Profil mis à jour', time: 'Il y a 2 heures' }
        ]
      })
    }
  }, [user])

  if (loading) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div className="card">
          <h2>Chargement...</h2>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div className="container" style={{ padding: '80px 20px' }}>
      <div className="card">
        <h1 style={{ marginBottom: '32px' }}>Tableau de bord</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '40px' }}>
          Bienvenue, {user.name} ! Voici un aperçu de votre activité.
        </p>

        <div className="grid">
          <div className="card">
            <h3>👥 Utilisateurs totaux</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
              {stats.totalUsers.toLocaleString()}
            </p>
          </div>
          <div className="card">
            <h3>🟢 Utilisateurs actifs</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#51cf66' }}>
              {stats.activeUsers.toLocaleString()}
            </p>
          </div>
          <div className="card">
            <h3>📝 Posts totaux</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffd43b' }}>
              {stats.totalPosts.toLocaleString()}
            </p>
          </div>
          <div className="card">
            <h3>📊 Taux d'engagement</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6b6b' }}>
              {Math.round((stats.activeUsers / stats.totalUsers) * 100)}%
            </p>
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          <h2 style={{ marginBottom: '24px' }}>Activité récente</h2>
          <div className="card">
            {stats.recentActivity.map((activity) => (
              <div 
                key={activity.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <span>{activity.action}</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          <h2 style={{ marginBottom: '24px' }}>Actions rapides</h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button className="btn">
              📝 Créer un post
            </button>
            <button className="btn btn-secondary">
              👤 Modifier le profil
            </button>
            <button className="btn btn-secondary">
              ⚙️ Paramètres
            </button>
            <button className="btn btn-secondary">
              📊 Voir les statistiques
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard