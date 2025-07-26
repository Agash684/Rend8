#!/bin/bash

echo "🚀 Démarrage de l'application CCACA..."

# Démarrer le serveur backend
echo "📡 Démarrage du serveur backend..."
npm run server &
BACKEND_PID=$!

# Attendre que le backend démarre
sleep 3

# Démarrer le serveur frontend
echo "🌐 Démarrage du serveur frontend..."
npm run dev &
FRONTEND_PID=$!

echo "✅ Application démarrée !"
echo "📡 Backend: http://localhost:5000"
echo "🌐 Frontend: http://localhost:3000"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter les serveurs"

# Fonction pour arrêter les serveurs
cleanup() {
    echo ""
    echo "🛑 Arrêt des serveurs..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT

# Attendre que les processus se terminent
wait