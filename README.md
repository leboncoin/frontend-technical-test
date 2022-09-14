# Context :

At leboncoin, our users can share messages about a transaction, or ask for informations about any products.

Your job is to create the interface to consult those messages.
The interface needs to work on both desktop & mobile devices.

In addition to your code, a README explaining your thought process and your choices would be appreciated.

# Exercice :

- Display a list of all the conversations
- Allow the user to select a conversation
  - Inside the conversation, there is a list of all the messages between these two users.
  - As a user, you can type and send new messages in this conversation

**As your application can be used by millions of users, make sure to provide some robust safety guards.**

### Sketches :

Obvisouly, it is up to you to make something nice and pretty, you are free to design it the way you like. The sketches are here to give you an idea on how it should look.

<details>
  <summary>Click to see the sketches</summary>
  
Mobile list :

![](./sketches/list-mobile.jpg)

Desktop list :

![](./sketches/list-desktop.jpg)

Mobile conversation :

![](./sketches/conv-mobile.jpg)

Desktop conversation :

![](./sketches/conv-desktop.jpg)

</details>

### API :

You can find the API swagger file in `docs/api-swagger.yaml`.

For a better readibility, you can view it on [https://leboncoin.tech/frontend-technical-test/](https://leboncoin.tech/frontend-technical-test/).

---

## Bonus 1 :

We provide some conversation samples, but can you improve the app so the user can now create new conversations ?

## Bonus 2 :

Our infrastructure is a bit shaky.. Sometimes the servers are crashing. “It’s not you, it’s me”, but maybe you can display something nice to warn the user and handle it gracefully.

## Do you want to make the app even better ?

Feel free to make as many improvements as you like.
We love creativity and technical challenges.

If you are out of ideas, here are some thoughts :

- As we want to reach our users anywhere, we need to make sure the app is performing well. What can you do to make it really fast ?

- Our goal is to support everybody in the country, including people with disabilities. As a good citizen and a good developer, can you make sure the app is accessible for everyone ?

- We all love to relax after a hard day’s work. It would be a shame if we didn’t feel confident enough about the upcoming automatic deployment. Are you sure everything has been tested thoroughly ?

## Thoughts process

Pour faire ce test technique, je me suis donné une strict limite de 4h, test fait le 14/09/2022

- J'ai commencé par la partie listing des utilisateurs
- Après avoir analysé l'API, je me suis dis que ça serait le plus simple pour commencer

- En terme de librairies installés, j'ai décidé d'utiliser Material-UI pour les composants graphiques et Axios pour les requêtes
-- Ce sont 2 librairies que je connais bien et que j'ai l'habitude d'utiliser

- Ensuite je me suis rendu compte que j'avais besoin de l'utilisateur authentifié au plus tôt de l'application, donc j'ai décidé d'utiliser Redux pour et stocker l'utilisateur authentifié de l'app le plus rapidement possible PUIS de récupérer sa liste de conversations

- L'un des problème rencontré a été la gestion des requêtes inutiles pour les conversations, le but était de ne pas surcharger le serveur si beaucoup de personnes vont en même temps sur le site
- Ensuite, j'ai commencé la séparation des différents composants dont j'avais besoin dans les listes des conversations et des messages
- Puis, j'ai implémenté la librairie react-query qui permet d'optimiser les requêtes APIs en arrivant sur les pages, elle seule permet de corriger divers problèmes futures pour la surcharge des requêtes sur la page
- Enfin, je me suis occupé de la responsivité. Material-UI avait déjà géré la majeure partie mais 2 problèmes subsistaient : les avatars sur la page principale et la date dans les messages qui s'affichait toujours
-- Pour régler ça, j'ai utilisé des Breakpoints, une feature de Material-UI
- Ensuite, j'ai utilisé un peu de temps bonus pour m'occuper de l'envoi de message, où j'ai désactivé les boutons d'envoi si un message était en cours d'envoi, pour éviter la surcharge côté serveur, mais il manque une concaténation automatique du message envoyé côté client.
- L'idée aurait été de faire un append du message en local au lieu de faire un nouveau GET / pour éviter une requête réseau, je n'ai malheureusement pas eu le temps de le faire