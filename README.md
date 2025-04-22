# SalesWebapp

Frontend Angular 19 para integração com a API Sales.

## 📦 Tecnologias
- Angular 19
- SCSS
- TypeScript
- RxJS
- RESTful API

## 🚀 Como executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/aurilio/sales-webapp.git
   cd sales-webapp
   
   ```


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## 🐳 Executar via Docker (imagem pronta no Docker Hub)

Se você deseja rodar a aplicação sem precisar clonar o repositório ou fazer o build manual, basta usar a imagem Docker já publicada:

### 📥 Baixar e executar a imagem

```bash
docker run -d -p 4200:80 --name sales-webapp aurilio/saleapi:latest

```

🌐 Acessar a aplicação
Abra o navegador e acesse:
```bash
http://localhost:4200

```