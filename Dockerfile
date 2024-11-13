# Utilisation d'une image de base Node.js
FROM node:14

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste
COPY . .

# Construire les fichiers TypeScript
RUN npm run build

# Exposer le port
EXPOSE 3030

# Démarrer l'application
CMD ["npm", "start"]
