<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Présentation

Ce projet utilise PostgreSQL avec Docker et TypeORM

## Installation

### Installation des dépendances

```bash
$ npm install 
```

### Variables d'environnements

Dans un fichier `.env`, définir la variable **JWT_SECRET=***secret*****

Par défaut, le port 3000 est utilisé, mais vous pouvez le changer en renseignant la variable **PORT** dans le fichier

### Lancement de la base de données

```bash
$ docker-compose up db 
```

## Lancement du projet

```bash
# compilation
$ npm run build

# lancement
$ npm run start
```

## Usage

Aller sur la page /api et aller dans la partie authentication puis dans sign-up

N'importe qui peut créer un compte en tant qu'utilisateur standard ou en tant qu'administrateur

Une fois le compte créé, connectez vous dans la partie sign-in, copiez-coller le contenu du token dans Authorize (en haut a droit de la page) 

Vous etes ainsi connectez pour toutes vos actions

## Lancement des tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test couverture de code
$ npm run test:cov
```

