# Utilisation d'une image de base Node.js
FROM node:lts-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier tout le reste
COPY . .

# Installer les dépendances
RUN npm install -g pnpm
RUN pnpm install

# Construire les fichiers TypeScript
RUN npm run build

# Exposer le port
EXPOSE 3030

# Démarrer l'application
CMD ["npm", "start"]
