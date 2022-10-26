# Api-Piiquante

Piiquante - Création d'une API
Projet 6 - OC

Les sauces piquantes sont de plus en plus populaires, en grande partie grâce à la série YouTube « Hot Ones » .
C’est pourquoi ce nouveau client, la marque de condiments à base de piment Piiquante, veut développer une application web de critique des sauces piquantes appelée « Hot Takes » . Si la responsable produit de Piiquante souhaite à terme transformer l'application d'évaluation en une boutique en ligne, elle souhaite que la première version soit une « galerie de sauces » permettant aux utilisateurs de télécharger leurs sauces piquantes préférées et de liker ou disliker les sauces que d'autres partagent. Le front-end de l'application a été développé à l'aide d'Angular et a été précompilé après des tests internes, mais Piiquante a besoin d'un développeur back-end pour construire l'API.

Installation
Vous pouvez cloner ce repository, afin de récupérer les dossiers frontend et backend de l'Application.

Connection à la base de donnée:
Avec un compte( readOnly) :
MONGO_DB_USER=TesteurProjet
MONGO_DB_USER_MDP=azerty6363

TOKEN :
Fichier .env_example: TOKEN_SECRET="RANDOM_KEY"

Lancement du server

cd backend
nodemon serve

Lancement du front

cd frontend
npm start
