# server/Dockerfile
FROM node:20-alpine

# On définit le dossier de travail dans le conteneur
WORKDIR /app

# On copie les fichiers de configuration npm
COPY package*.json ./

# On installe les dépendances
RUN npm install

# On copie le reste du code source
COPY . .

# On expose le port 4000 (celui défini dans notre code et .env)
EXPOSE 4000

# On lance le serveur avec nodemon (le script "dev" qu'on a créé)
CMD ["npm", "run", "dev"]