import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          CCACA
        </Link>
        <ul className="navbar-nav">
          <li><Link to="/">Accueil</Link></li>
          {user ? (
            <>
              <li><Link to="/dashboard">Tableau de bord</Link></li>
              <li><Link to="/profile">Profil</Link></li>
              <li>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Connexion</Link></li>
              <li><Link to="/register">Inscription</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar