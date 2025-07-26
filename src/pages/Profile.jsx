import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const Profile = () => {
  const { user, loading, updateProfile } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loadingUpdate, setLoadingUpdate] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoadingUpdate(true)

    const result = await updateProfile(formData)
    
    if (result.success) {
      setSuccess('Profil mis à jour avec succès !')
    } else {
      setError(result.error)
    }
    
    setLoadingUpdate(false)
  }

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
    <div className="container" style={{ padding: '80px 20px', maxWidth: '600px', margin: '0 auto' }}>
      <div className="card">
        <h1 style={{ marginBottom: '32px', textAlign: 'center' }}>Mon Profil</h1>
        
        {error && (
          <div style={{ 
            background: 'rgba(255, 0, 0, 0.1)', 
            color: '#ff6b6b', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            border: '1px solid rgba(255, 0, 0, 0.3)'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ 
            background: 'rgba(0, 255, 0, 0.1)', 
            color: '#51cf66', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            border: '1px solid rgba(0, 255, 0, 0.3)'
          }}>
            {success}
          </div>
        )}

        <div style={{ marginBottom: '32px' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: 'white',
            margin: '0 auto 16px'
          }}>
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <h3 style={{ textAlign: 'center', marginBottom: '8px' }}>{user.name}</h3>
          <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>
            Membre depuis {new Date(user.createdAt || Date.now()).toLocaleDateString()}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom complet</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Votre nom complet"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Parlez-nous un peu de vous..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Localisation</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Votre ville, pays"
            />
          </div>

          <button 
            type="submit" 
            className="btn" 
            style={{ width: '100%', marginTop: '20px' }}
            disabled={loadingUpdate}
          >
            {loadingUpdate ? 'Mise à jour...' : 'Mettre à jour le profil'}
          </button>
        </form>

        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h3 style={{ marginBottom: '16px' }}>Informations du compte</h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>ID utilisateur:</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{user._id || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Date d'inscription:</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {new Date(user.createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Dernière connexion:</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile