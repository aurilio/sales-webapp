# Etapa 1: Build da aplicação Angular
FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Remove a configuração padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o build do Angular para o Nginx
COPY --from=build /app/dist/sales-webapp/browser /usr/share/nginx/html

# Copia o nginx.conf customizado
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]