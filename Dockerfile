# ⚡ Étape 1 : Image pour le développement
FROM node:18-alpine AS development

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers package.json pour optimiser le cache Docker
COPY package*.json ./

# Installer les dépendances en mode développement
RUN npm install

# Copier tout le projet après installation des dépendances
COPY . .

# ⚡ Étape 2 : Build de l'application pour la production
FROM node:18-alpine AS builder

WORKDIR /app

# Copier les fichiers depuis l'étape "development"
COPY --from=development /app ./

# Construire l'application Next.js
RUN npm run build

# ⚡ Étape 3 : Image finale pour la production
FROM node:18-alpine AS production

WORKDIR /app

# Copier uniquement les fichiers essentiels pour exécuter Next.js en production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Réinstaller uniquement les dépendances nécessaires pour la production
RUN npm install --omit=dev --prefer-offline --no-audit

# Exposer le port utilisé par Next.js
EXPOSE 3000

# Lancer l'application en production
CMD ["npm", "start"]
