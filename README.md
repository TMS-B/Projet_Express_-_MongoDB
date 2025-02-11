# Projet Express & MongoDB

## Description

Ce projet couvre les concepts de base d'Express.js et Mongoose, et permet de comprendre comment créer un serveur, gérer une base de données MongoDB et implémenter des fonctionnalités d'authentification. Les exercices augmentent progressivement en difficulté, en allant de la configuration du serveur à la gestion des utilisateurs avec authentification et validation.

## Prérequis

- Node.js
- npm

## Dépendance installé

`npm i express mongoose dotenv nodemon jsonwebtoken cookie-parser express-validator gitignore bcrypt`

## Installation

Clonez le dépot:

```
git clone https://github.com/xanbalandrau/Projet-express.git
cd Projet-express
```

Installez les dépendances:

`npm i`

## Utilisation

Lancez le serveur :

`npm start`

Le serverus tournera sur http://localhost:3000

## Structure du projet

```
.
├── node_modules
├── src/
│   ├── routes/
│   │   ├── userRoutes.js
│   ├── controllers/
│   │   ├── userControllers.js
│   ├── models/
│   │   ├── User.js
│   ├── db/
│   │   ├── db.js
│   ├── middleware/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── validateur.js
├── .env
├── .gitignore
├── Documentation.md
├── Enoncé.md
├── package.json
├── README.md
├── server.js
```

Dans .env :

```
MONGO_URI =
JWT_SECRET =
```

Dans .gitignore :

```
node_modules
.env
```

## API Endpoints

| Méthode    | Endpoint              | Description                  |
| ---------- | --------------------- | ---------------------------- |
| **GET**    | `/`                   | Page d'accueil               |
| **GET**    | `/api/users/`         | Liste des utilisateurs       |
| **POST**   | `/api/users/register` | Créer un utilisateur         |
| **PUT**    | `/api/users/:id`      | Mettre à jour un utilisateur |
| **DELETE** | `/api/users/:id`      | Supprimer un utilisateur     |
| **POST**   | `/api/users/login`    | Se connecter                 |

## Contributions

Thomas BAULLARD - [GitHub](https://github.com/TMS-B)