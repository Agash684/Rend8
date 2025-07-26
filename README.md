# CCACA - Application Moderne

Une application web moderne et fonctionnelle construite avec React, Node.js, Express et MongoDB.

## 🚀 Fonctionnalités

- **Authentification complète** : Inscription, connexion, gestion des sessions
- **Interface moderne** : Design responsive avec animations fluides
- **Tableau de bord interactif** : Statistiques et activités en temps réel
- **Gestion de profil** : Modification des informations utilisateur
- **API REST sécurisée** : Backend complet avec validation et gestion d'erreurs
- **Base de données MongoDB** : Stockage persistant des données

## 🛠️ Technologies utilisées

### Frontend
- **React 18** - Bibliothèque UI
- **React Router** - Navigation
- **Vite** - Build tool et dev server
- **Axios** - Client HTTP
- **CSS3** - Styles modernes avec gradients et animations

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification par tokens
- **bcryptjs** - Hashage des mots de passe
- **CORS** - Gestion des requêtes cross-origin

## 📦 Installation

### Prérequis
- Node.js (v16 ou supérieur)
- MongoDB (local ou cloud)
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd ccaca-app
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'environnement**
   ```bash
   cp .env.example .env
   ```
   Modifiez le fichier `.env` avec vos configurations :
   - `MONGODB_URI` : URL de votre base de données MongoDB
   - `JWT_SECRET` : Clé secrète pour les tokens JWT
   - `PORT` : Port du serveur (défaut: 5000)

4. **Démarrer le serveur de développement**
   ```bash
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run dev
   ```

5. **Accéder à l'application**
   - Frontend : http://localhost:3000
   - Backend API : http://localhost:5000

## 🏗️ Structure du projet

```
ccaca-app/
├── src/                    # Code source React
│   ├── components/         # Composants réutilisables
│   ├── context/           # Contextes React (Auth)
│   ├── pages/             # Pages de l'application
│   ├── App.jsx           # Composant principal
│   ├── main.jsx          # Point d'entrée
│   └── index.css         # Styles globaux
├── server/                # Code source Node.js
│   ├── models/           # Modèles MongoDB
│   ├── routes/           # Routes API
│   ├── middleware/       # Middlewares Express
│   └── index.js         # Serveur principal
├── public/               # Fichiers statiques
├── package.json          # Dépendances et scripts
├── vite.config.js       # Configuration Vite
└── README.md            # Documentation
```

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev          # Démarrer le frontend en mode dev
npm run server       # Démarrer le serveur backend
npm run build        # Build de production
npm run preview      # Prévisualiser le build

# Linting
npm run lint         # Vérifier le code avec ESLint
```

## 📡 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription utilisateur
- `POST /api/auth/login` - Connexion utilisateur
- `GET /api/auth/me` - Récupérer l'utilisateur connecté
- `PUT /api/auth/profile` - Mettre à jour le profil

### Utilisateurs
- `GET /api/users` - Liste des utilisateurs
- `GET /api/users/:id` - Détails d'un utilisateur
- `GET /api/users/stats` - Statistiques utilisateurs

### Système
- `GET /api/health` - Vérification de l'état du serveur

## 🔐 Sécurité

- **Mots de passe hashés** avec bcrypt
- **Tokens JWT** pour l'authentification
- **Validation des données** côté serveur
- **Protection CORS** configurée
- **Gestion d'erreurs** centralisée

## 🎨 Design

- **Interface moderne** avec design glassmorphism
- **Responsive** pour tous les appareils
- **Animations fluides** et transitions
- **Palette de couleurs** cohérente
- **Typographie** optimisée pour la lisibilité

## 🚀 Déploiement

### Frontend (Vercel/Netlify)
```bash
npm run build
# Déployer le dossier dist/
```

### Backend (Heroku/Railway)
```bash
# Configurer les variables d'environnement
# Déployer le dossier server/
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement

---

**CCACA** - Application moderne et fonctionnelle 🚀