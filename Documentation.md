# Projet Express & MongoDB

### Initialisation de l'environnement

`npm init -y`

`npm i express mongoose dotenv nodemon`

`"start": "nodemon server.js"` dans le scripts du package.json

## Exercice 1

Création d'une base de donnée MongoDB Atlas avec mongoose puis connexion à celle-ci.

On lance le serveur pour voir si ça se connecte à la db :

`npm start`

Connexion réussie ! On passe à l'étape suivante.

## Exercice 2

Création d'un model User dans un dossier models.

## Exercice 3

Création des dossiers controllers et routes:

- `mkdir controllers && cd controllers && touch userControllers.js`
- `mkdir routes && cd routes && touch userRoutes.js`

On test avec Postman de créer un utilisateur:

POST : http://localhost:3000/api/users/register

Voici le résultat :

```
{
    "message": "Utilisateur crée",
    "user": {
        "name": "thomas",
        "email": "thomas@gmail.com",
        "password": "thomas",
        "_id": "67a487f878a28ff33071de3e",
        "createdAt": "2025-02-06T09:59:20.008Z",
        "updatedAt": "2025-02-06T09:59:20.008Z",
        "__v": 0
    }
}
```

## Exercice 4

Création d'une route pour récupérer tout les utilisateurs.

On test avec Postman:

GET : http://localhost:3000/api/users/

Voici le résultat :

```
{
    "users": [
        {
            "_id": "67a4879178a28ff33071de39",
            "name": "thomas",
            "email": "thomas@gmail.com",
            "password": "thomas",
            "createdAt": "2025-02-06T09:57:37.371Z",
            "updatedAt": "2025-02-06T09:57:37.371Z",
            "__v": 0
        }
    ]
}
```

## Exercice 5

Création d'une route pour mettre à jour les données d'un utilisateur.

On test avec Postman:

PUT : http://localhost:3000/api/users/67a4879178a28ff33071de39

Voici le résultat :

```
{
    "message": "Utilisateur mis à jour",
    "user": {
        "_id": "67a4879178a28ff33071de39",
        "name": "thomas MAJ",
        "email": "thomas@gmail.com",
        "password": "thomas",
        "createdAt": "2025-02-06T09:57:37.371Z",
        "updatedAt": "2025-02-06T10:31:59.958Z",
        "__v": 0
    }
}
```

## Exercice 6

Création d'une route pour supprimer un utilisateur.

On test avec Postman:

DELETE : http://localhost:3000/api/users/67a487f878a28ff33071de3e

Voici le résultat :

```
{
    "message": "Utilisateur supprimé"
}
```

## Exercice 7

Création d'une route pour se login, hachage du mot de passe (middleware ssdans model) et création d'un token.

`npm i bcrypt jsonwebtoken`

On test avec Postman:

POST : http://localhost:3000/api/users/login

Voici le résultat :

```
{
    "user": {
        "_id": "67a4b414a94815f3a90beadd",
        "name": "thomas",
        "email": "thomas@gmail.com",
        "password": "$2b$10$XB1IXceKWNcHGnqTzDBn6eeS3lyGzEGK/c8Mk25hyiUYng22Yku/e",
        "createdAt": "2025-02-06T13:07:32.082Z",
        "updatedAt": "2025-02-06T13:07:32.082Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2E0YjQxNGE5NDgxNWYzYTkwYmVhZGQiLCJpYXQiOjE3Mzg4NDczMDYsImV4cCI6MTczODg1ODEwNn0.U7GUqkhG22xnxisR_4vmrT8fIcd14_1f8SXlsYGEPdA"
}
```

## Exercice 8

Création d'un middleware pour l'authentification dans un dossier middleware.

`npm i cookie-parser`

On met le middleware sur la route pour recupérer les utilisateurs.

On test avec Postman:

GET : http://localhost:3000/api/users/

Voici le résultat dans le header :

`Cookie : jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2E0YjhjYjA3YzcwODY0MWUyYTU4MGQiLCJpYXQiOjE3Mzg4NDg0OTEsImV4cCI6MTczODg1OTI5MX0.EZGhBdUCDzzgxeHbFGtsRWchkDUrHNoDZwcyW_8Sxqk`

## Exercice 9

Création d'un middleware pour le rôle admin un dossier middleware et ajout du role admin dans le model User.

On met le middleware sur la route pour recupérer les utilisateurs.

On test avec Postman:

GET : http://localhost:3000/api/users/

Voici le résultat:

```
{
    "users": [
        {
            "role": "user",
            "_id": "67a4b414a94815f3a90beadd",
            "name": "thomas",
            "email": "thomas@gmail.com",
            "password": "thomas",
            "createdAt": "2025-02-06T13:07:32.082Z",
            "updatedAt": "2025-02-06T13:14:37.572Z",
            "__v": 0
        },
        {
            "role": "user",
            "_id": "67a4b8cb07c708641e2a580d",
            "name": "xan",
            "email": "xan@gmail.com",
            "password": "$2b$10$.D3V03lOxs8reJucmrFF0e6qvPOhQ1S5y/rgCKSiweK7GKqNye4.e",
            "createdAt": "2025-02-06T13:27:39.639Z",
            "updatedAt": "2025-02-06T13:27:39.639Z",
            "__v": 0
        },
        {
            "_id": "67a4c68ac50c06a770a5636e",
            "name": "armen",
            "email": "armen@gmail.com",
            "password": "$2b$10$tk6NxC8QXG4wGVmZrLt6HOfoWu30mAs65y2bZmw1HkrsyITO6cjoK",
            "role": "admin",
            "createdAt": "2025-02-06T14:26:18.630Z",
            "updatedAt": "2025-02-06T14:26:18.630Z",
            "__v": 0
        }
    ]
}
```

## Exercice 10
