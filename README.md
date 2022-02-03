# React Native _Master / Details_

Application mobile cross-platforms développée avec React Native illustrant le concept ergonomique _Master / Details_.

## Commandes utiles

- Installation des dépendances NPM :

`npm install`

- (Dans un 1er onglet du terminal) Démarrage du Bundler JS _Metro_ :

`npx react-native start`

- (Dans un 2nd onglet du terminal) Démarrage de l'application sur l'émulateur mobile Android ou iOS :

`npx react-native run-android`

ou

`npx react-native run-ios`

## Dépendances

- Navigation : https://reactnative.dev/docs/navigation

- Firebase : https://firebase.google.com/docs/web/setup

- Firebase Hooks : https://github.com/CSFrequency/react-firebase-hooks

- Async Storage : https://github.com/react-native-async-storage/async-storage

## Documentation

- Activy Indicator : https://reactnative.dev/docs/activityindicator

- Navigation : https://reactnative.dev/docs/navigation

- Flat List : https://reactnative.dev/docs/flatlist

- Confirm Dialog : https://www.kindacode.com/article/how-to-create-a-confirm-dialog-in-react-native/

- Authentification avec Google Firebase : https://firebase.google.com/codelabs/firebase-web?authuser=0#0

- Suivre le tutoriel "authentification par mot de passe" de Firebase : https://firebase.google.com/docs/auth/web/password-auth?authuser=0

## Firebase

Suivre ce tutoriel : https://firebase.google.com/codelabs/firebase-we

1. Depuis la vue d'ensemble du projet 
https://console.firebase.google.com/project/<nom-du-projet>/overview
2. Ajouter une application web pour le projet
3. Copier le code fourni et l'intégrer à l'application React 
4. Renommer le fichier ./config-example.js en ./config.js
5. Compléter le fichier ./config.js avec les données communiquées dans Firebase.

## API REST

https://jsonplaceholder.typicode.com/users

## Modèle de données __User__ + données imbriquées

- User
  - Address
    - Geo
    - Company

```
{
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
```

---

__Alexandre Leroux__

- alex@sherpa.one
- https://sherpa.one
- sherpa#3890
- https://github.com/sherpa1/

_Développeur Full Stack (Web & Mobile)_

_Enseignant vacataire à l'Université de Lorraine / Formateur indépendant_

- IUT Nancy-Charlemagne (LP Ciasie)

- Institut des Sciences du Digital, Management & Cognition (Masters Sciences Cognitives)

- CESI Alternance (Concepteur développeur d'applications - Manager en architecture et application logicielles des systèmes d'information) 