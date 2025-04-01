FROM node:20.2-alpine

# Verzeichnis für deine Anwendung
WORKDIR /app

COPY package*.json ./

# Abhängigkeiten installieren
RUN npm ci

# Dann den gesamten Code kopieren
COPY backend/ .

# Den Port 3000 im Container freigeben
EXPOSE 3000

# Start-Befehl für den Server
CMD ["node", "app.js"]
