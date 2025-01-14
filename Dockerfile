# Base Node.js para desarrollo
FROM node:22-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el código de la aplicación
COPY . .

RUN npm install -g nodemon

# Copiar el script wait-for-it
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh


# Exponer el puerto
EXPOSE 4001

# Comando de inicio con wait-for-it
CMD ["/wait-for-it.sh", "postgres", "5432", "--", "npm", "run", "dev"]
