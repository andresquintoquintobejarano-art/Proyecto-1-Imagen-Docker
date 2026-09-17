# Imagen base liviana con versión fija
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos primero package.json para aprovechar la cache de capas de Docker
COPY package.json package-lock.json* ./

# Instalamos únicamente dependencias de producción
RUN npm install --omit=dev

# Copiamos el resto del código fuente
COPY . .

# Puerto en el que escucha la API
EXPOSE 3000

# Variable de entorno por defecto (puede sobreescribirse con -e)
ENV PORT=3000

# Comando de arranque del contenedor
CMD ["node", "server.js"]
