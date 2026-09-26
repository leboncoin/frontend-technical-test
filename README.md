# Interface de messagerie — Test technique Frontend Leboncoin

Interface de messagerie responsive **Inbox → Conversation → Envoi**, construite à partir du starter fourni pour le test technique.

L’implémentation privilégie quatre objectifs :

- **respecter le contrat réellement fourni** ;
- **isoler les incohérences de l’API à la frontière** ;
- **gérer proprement l’asynchronisme et les erreurs** ;
- **rester simple, lisible et proportionnée au scope du test**.

---

## 1. Fonctionnalités

### Fonctionnalités demandées

- Affichage des conversations du compte connecté
- Prise en compte du cas où l’utilisateur est **sender ou recipient**
- Tri des conversations par dernier message
- Sélection d’une conversation
- Chargement des messages à la demande
- Tri chronologique des messages
- Distinction messages envoyés / reçus
- Envoi d’un nouveau message
- Prévention des doubles soumissions
- Conservation du brouillon en cas d’échec
- États de chargement, vide et erreur
- Retry manuel
- Interface desktop et mobile

### Bonus implémentés

- Création d’une nouvelle conversation
- Sélection du destinataire via `/users`
- Gestion défensive des erreurs réseau / serveur
- Cache local des historiques déjà chargés

### Qualité

- TypeScript strict
- Frontière API typée et défensive
- Normalisation centralisée des données externes
- Protection contre les race conditions
- Gestion du focus et navigation clavier
- Support du cas IME pour `Enter`
- Messages utilisateur sans exposition des détails techniques
- Corps des messages rendus comme texte, jamais comme HTML brut

---

# 2. Philosophie d’architecture

Principe directeur :

> **Les données externes sont considérées comme non fiables : elles sont validées et normalisées une seule fois à la frontière API ; le reste de l’application travaille ensuite avec des types domaine stables.**

```text
                 API REST fournie
                       │
                       ▼
              ┌───────────────────┐
              │    src/api        │
              │ HTTP + validation │
              │ + normalisation   │
              └─────────┬─────────┘
                        │
                        ▼
              ┌───────────────────┐
              │      Hooks        │
              │ state + async     │
              │ + cache           │
              └─────────┬─────────┘
                        │
                        ▼
              ┌───────────────────┐
              │    Composants     │
              │ présentation / UI │
              └───────────────────┘
```

`src/components/messaging` est le point de composition de l’écran : sélection, envoi, création, hooks de données et gestion du focus y sont câblés ; `src/pages/index.tsx` se contente de le rendre. Les autres composants restent autant que possible présentatifs.

---

# 3. Structure du projet

```text
src/
├── api/
│   ├── http.ts            (transport central : ok/erreurs/JSON)
│   ├── normalize.ts       (coercition des données externes)
│   ├── conversations.ts
│   ├── messages.ts
│   ├── users.ts
│   └── normalize.test.ts  (colocated)
│
├── components/            (un dossier par composant, styles + tests colocated)
│   ├── messaging/         (écran : composition + layout responsive)
│   ├── conversation-list/
│   ├── conversation-panel/
│   ├── message-list/
│   ├── message-composer/
│   ├── new-conversation-dialog/
│   ├── avatar/
│   └── icons/
│
├── constants/
│   ├── layout.ts          (breakpoint mobile, ids DOM de restauration du focus)
│   └── messages.ts        (limite client du composer)
│
├── hooks/
│   ├── useConversations.ts
│   ├── useConversationMessages.ts
│   ├── useMediaQuery.ts
│   └── useConversations.test.ts
│
├── pages/
│   ├── _app.tsx
│   └── index.tsx          (rend <Messaging />)
│
├── types/
│   ├── conversation.ts
│   ├── message.ts
│   ├── user.ts
│   └── loading.ts         (LoadStatus partagé)
│
├── utils/
│   ├── conversation.ts    (counterpart, ownership, tri)
│   ├── datetime.ts
│   └── getLoggedUserId.ts
│
└── styles/
    └── globals.css        (tokens globaux uniquement)
```

Les imports cross-domaine utilisent des alias TypeScript : `@components/*`, `@hooks/*`, `@api/*`, `@utils/*`, `@constants/*` (et `@/*` pour le reste), configurés dans `tsconfig.json` et reflétés dans `jest.config.js`. Le préfixe `@types/*` est volontairement absent : il est réservé aux packages DefinitelyTyped.

---

# 4. Pourquoi conserver le Pages Router ?

Le starter fourni utilise déjà le **Pages Router**. Je n’ai donc pas migré l’application vers l’App Router.

Ce choix ne signifie pas que l’App Router est moins adapté en général. Il est lié au **scope du test** :

- l’application possède essentiellement une page interactive ;
- l’API fournie est consommée côté client ;
- aucun besoin SEO ou de routing avancé n’impose une migration ;
- la structure du starter est déjà fonctionnelle ;
- la migration introduirait du churn architectural sans résoudre un problème demandé.

La règle suivie est donc :

> **Ne pas transformer l’architecture existante sans bénéfice concret pour le problème à résoudre.**

---

# 5. Pourquoi pas Redux, Zustand ou TanStack Query ?

Le state nécessaire reste limité :

```text
- conversations
- conversation sélectionnée
- messages par conversation
- draft
- loading / error / sending
```

Deux hooks suffisent :

- `useConversations`
- `useConversationMessages`

Le cache des messages est indexé par conversation :

```text
messagesByConversation[conversationId]
```

Cette solution permet de garder les historiques déjà chargés tout en isolant les réponses asynchrones par ressource.

Une librairie comme Redux Toolkit, Zustand ou TanStack Query pourrait devenir pertinente avec davantage de screens, de server-state partagé, de revalidation, de synchronisation ou de requêtes complexes. Pour ce test, elle aurait surtout ajouté de la surface technique.

---

# 6. Frontière API

Tous les appels réseau passent par `src/api`.

Le wrapper HTTP centralise notamment :

- `response.ok` ;
- les erreurs réseau ;
- le parsing JSON ;
- les erreurs destinées à l’utilisateur ;
- l’encodage des paramètres de chemin.

Point important : `fetch()` ne rejette pas automatiquement sur `404` ou `500`. Le wrapper transforme donc explicitement ces réponses en erreurs applicatives.

Les composants ne manipulent pas directement les réponses HTTP brutes.

---

# 7. Normalisation des données

Le contrat fourni présente plusieurs différences entre documentation et runtime. Elles sont isolées à la frontière.

## Timestamps

Les fixtures utilisent des timestamps Unix en **secondes**, alors que la documentation décrit notamment `Message.timestamp` comme une chaîne.

L’application normalise toutes les représentations acceptées vers :

```text
epoch milliseconds
```

Le reste du code ne doit donc pas savoir si l’API a envoyé des secondes, des millisecondes ou une représentation string compatible.

```text
API
  ↓
format externe
  ↓
normalize.ts
  ↓
number (ms)
  ↓
domain model
  ↓
UI
```

Les conversions ne sont pas dispersées dans les composants.

---

# 8. Pièges du contrat API vérifiés et pris en compte

Le comportement du serveur fourni a été vérifié au runtime et les écarts ont été traités dans la couche API.

| Comportement observé | Traitement |
|---|---|
| Les fixtures renvoient des timestamps Unix en secondes | Normalisation en millisecondes |
| Swagger décrit certains timestamps comme `string` | La frontière accepte les représentations nécessaires |
| `POST /messages` renvoie `201` avec l’entité créée | Le client reconstruit le modèle domaine à partir de la réponse partielle et des données locales connues |
| `json-server` persiste exactement le body reçu | `conversationId` et `authorId` sont présents dans le body envoyé |
| Le middleware des conversations conserve son état initial | Une conversation créée est intégrée localement plutôt que de dépendre d’un refetch immédiat |
| `GET /user/:id` retourne un tableau malgré la documentation | Le flux utilise `/users` |
| `GET /messages/:unknownId` retourne `[] 200` | Limitation documentée : conversation inconnue et conversation vide sont indiscernables par cette API |
| Les GET ne disposent pas de headers de cache adaptés | `cache: 'no-store'` est envoyé côté frontend |

Ces adaptations ne modifient pas le backend : elles **encapsulent ses particularités dans la frontière API**.

---

# 9. Directionnalité : sender ou recipient

Une conversation ne suppose jamais que l’utilisateur connecté est forcément le sender.

Le cas où l’utilisateur est recipient est explicitement pris en compte.

Le counterpart est dérivé depuis les IDs des participants.

Pour les messages :

```text
authorId === loggedUserId
        ↓
message envoyé → droite

sinon
        ↓
message reçu → gauche
```

L’ownership est dérivée, pas dupliquée dans le state.

---

# 10. Chargement des messages : lazy loading + cache

L’application ne récupère pas l’historique de toutes les conversations au démarrage.

```text
Initialisation
    ↓
GET conversations
    ↓
Sélection utilisateur
    ↓
GET messages/{conversationId}
    ↓
Cache par conversation
```

Une conversation déjà chargée n’est pas inutilement re-téléchargée.

Cette décision réduit le trafic initial et rend aussi les changements rapides de conversation plus robustes.

---

# 11. Race conditions : pourquoi le state est clé par conversation

Cas classique :

```text
A sélectionnée
↓
requête A

B sélectionnée
↓
requête B

B répond
↓
A répond plus tard
```

Le state est structuré comme :

```text
messagesByConversation[A]
messagesByConversation[B]
```

La réponse tardive de A ne peut donc écrire que dans A et ne peut pas écraser B.

Un test dédié reproduit ce scénario avec une réponse différée.

Un `AbortController` pourrait également économiser du trafic en annulant des requêtes devenues inutiles, mais il n’est pas nécessaire ici pour garantir la correction du state ; il reste une évolution possible en production.

---

# 12. Envoi de message

Le flux est volontairement conservateur :

```text
Validation
    ↓
Blocage double-submit
    ↓
POST
    ↓
Confirmation serveur
    ↓
Ajout local
    ↓
Mise à jour conversation / tri
```

Le draft est supprimé **uniquement après succès confirmé**.

En cas d’échec :

```text
draft conservé
+
erreur utilisateur
+
retry manuel
```

Les POST ne sont jamais automatiquement retry.

Pourquoi ? Parce qu’un POST est une opération à effet de bord et que le backend ne fournit pas de mécanisme d’idempotence : un retry aveugle peut créer un doublon.

---

# 13. Drafts et changement de conversation

Le panneau étant associé à la conversation sélectionnée, le draft est isolé par conversation et ne peut pas se retrouver affiché dans une autre.

Le choix actuel est de **ne pas persister le draft lorsqu’on quitte une conversation**. Le test n’impose pas une persistance de brouillons et le choix conserve un modèle de state simple.

Une persistance des drafts par conversation serait une extension possible dans un produit plus complet.

---

# 14. Pourquoi pas de WebSocket ?

Un produit de messagerie de production peut utiliser WebSocket ou SSE pour des mises à jour temps réel.

Mais le contrat du test est REST et ne fournit pas :

- transport WebSocket/SSE ;
- protocole d’événements ;
- séquence d’événements ;
- reprise après reconnexion ;
- contrat de synchronisation incrémentale.

Je n’ai donc pas inventé l’infrastructure backend manquante.

La décision est :

> **Implémenter correctement le transport fourni plutôt que simuler un backend realtime inexistant.**

---

# 15. Pourquoi pas de polling ?

Le polling est techniquement possible, mais l’API ne propose aucune primitive incrémentale comme :

```text
?since=...
?afterMessageId=...
cursor=...
```

Un polling régulier pourrait donc télécharger à nouveau l’historique complet simplement pour détecter un nouveau message.

Le coût serait :

- plus de trafic ;
- plus de requêtes ;
- une synchronisation imparfaite ;
- davantage de code et de complexité.

Le polling n’est donc pas implémenté.

---

# 16. Pourquoi pas de BFF ?

Un BFF peut être pertinent pour :

- agréger plusieurs backends ;
- traduire un protocole ;
- gérer des sessions/auth côté serveur ;
- exposer un contrat spécifique au frontend ;
- masquer une topologie backend complexe.

Aucun de ces besoins n’est démontré ici.

Ajouter :

```text
Browser → Next.js BFF → API fournie
```

aurait créé une nouvelle couche sans problème concret à résoudre.

---

# 17. Architecture realtime possible en production

Le fait de ne pas implémenter WebSocket dans ce test ne signifie pas qu’un produit réel resterait REST-only.

Une évolution possible serait :

```text
                    ┌──────────────────┐
                    │ Message service  │
                    └────────┬─────────┘
                             │
                    persistence + events
                             │
                ┌────────────▼────────────┐
                │ Realtime gateway / bus  │
                └────────────┬────────────┘
                             │
                         WebSocket
                             │
                             ▼
                          Browser
```

Avec notamment :

- reconnexion + backoff ;
- récupération des événements manqués ;
- déduplication par ID serveur ;
- gestion de l’ordre ;
- authentification ;
- synchronisation REST + realtime ;
- idempotency keys ;
- pagination par curseur.

Ce sont des considérations de production, pas des fonctionnalités à inventer pour ce test.

---

# 18. Pourquoi CSS Modules ?

Le projet utilise **CSS Modules**.

Pas de Tailwind, MUI, styled-components, ni design system custom.

Raisons :

- cohérence avec le starter ;
- styles isolés ;
- aucune dépendance runtime supplémentaire ;
- UI suffisamment petite ;
- CSS simple à inspecter ;
- pas besoin d’une couche d’abstraction de design system.

Le CSS global est limité aux tokens réellement partagés, tandis que les règles spécifiques restent dans les modules.

---

# 19. Responsive design

Le responsive change réellement le comportement du layout, plutôt que de simplement réduire la taille du desktop.

### Desktop

```text
┌────────────────────┬──────────────────────────┐
│ Conversations      │ Conversation sélectionnée│
│                    │                          │
│                    │ Messages                 │
│                    │                          │
│                    │ Composer                 │
└────────────────────┴──────────────────────────┘
```

### Mobile

```text
┌──────────────────────────────┐
│ Liste des conversations      │
└──────────────────────────────┘
```

Puis, après sélection :

```text
┌──────────────────────────────┐
│ ← Conversation               │
├──────────────────────────────┤
│ Messages                     │
│                              │
│                              │
├──────────────────────────────┤
│ Composer                     │
└──────────────────────────────┘
```

CSS gère le layout ; le JavaScript n’intervient pour la media query que lorsque le comportement interactif l’exige, notamment pour le focus.

---

# 20. Accessibilité

L’accessibilité est intégrée au fonctionnement de l’interface :

- vrais `<button>` pour les actions ;
- structure sémantique ;
- labels associés aux champs ;
- `aria-current` pour la conversation sélectionnée ;
- `role="alert"` pour les erreurs ;
- états de chargement annoncés ;
- `role="log"` pour la zone de messages ;
- focus visible via `:focus-visible` ;
- retour du focus après le back mobile ;
- gestion du focus du dialog ;
- fermeture clavier avec `Escape` ;
- targets principales ≥ 44 px ;
- aucune information importante uniquement par la couleur ;
- reflow sans scroll horizontal sur les largeurs mobiles vérifiées.

Le dialog restitue également le focus à son élément déclencheur après fermeture.

---

# 21. Composer : UX et IME

Le composer applique :

- refus des messages vides / whitespace-only ;
- `Enter` pour envoyer ;
- `Shift + Enter` pour une nouvelle ligne ;
- prévention du double-submit ;
- maintien du focus pendant l’envoi ;
- conservation du draft en cas d’échec ;
- restauration du focus pour un retry immédiat.

La vérification `isComposing` empêche un `Enter` utilisé pour confirmer une composition IME de déclencher accidentellement l’envoi.

Une limite client de 2 000 caractères est utilisée comme garde UX contre les collages pathologiques ; le backend reste l’autorité de validation.

---

# 22. Sécurité et sûreté

Les données de l’API sont traitées comme non fiables.

### Messages

Les messages sont rendus comme texte simple. Aucun `dangerouslySetInnerHTML` n’est utilisé.

### Tokens du fixture

Les champs `token` sont supprimés à la frontière API et ne sont ni affichés ni conservés dans l’état applicatif.

### URLs

Les paramètres de chemin sont encodés dans la couche API.

### Validation

La validation client est une aide UX et ne constitue jamais un mécanisme d’autorisation.

---

# 23. Gestion des erreurs

Les états sont séparés :

```text
idle → loading → success
             ↘ error → retry
```

Les erreurs sont contenues au niveau de la zone concernée.

Exemple :

```text
Inbox OK
+
GET messages en erreur
=
Inbox conservée
+
erreur/retry dans le panneau message
```

Un refresh en erreur ne doit pas effacer des données déjà utiles.

Les erreurs affichées sont courtes et orientées utilisateur ; les bodies HTTP et stack traces ne sont pas exposés.

---

# 24. Performance

Les optimisations se concentrent sur les problèmes réels du test :

- chargement lazy des messages ;
- cache par conversation ;
- pas de requête pour chaque historique au démarrage ;
- state conservé dans des hooks proches de son usage ;
- pas de `useMemo` / `useCallback` / `memo` ajoutés sans justification.

### Limite de scalabilité

L’API fournie n’expose ni pagination ni cursor.

Le frontend n’invente donc pas de pagination fictive.

À l’échelle de millions d’utilisateurs, une solution complète nécessiterait notamment :

- pagination/cursors ;
- requêtes backend efficaces ;
- stockage adapté ;
- mécanisme realtime ;
- stratégie de reconnexion ;
- éventuellement virtualisation côté rendu.

---

# 25. Tests

La stratégie sépare les niveaux de test au lieu de chercher uniquement un taux de couverture.

## Tests unitaires

Ils couvrent la logique déterministe et isolable :

- normalisation des timestamps ;
- validation/coercition ;
- directionnalité des conversations ;
- ownership des messages ;
- formatage des dates ;
- autres fonctions pures.

## Tests de comportement / intégration au niveau écran

Jest + React Testing Library couvrent les workflows qui font intervenir plusieurs parties de l’application :

- chargement ;
- sélection ;
- directionnalité ;
- lazy loading ;
- cache ;
- send succès/échec ;
- conservation du draft ;
- retry ;
- double-submit ;
- race condition ;
- création de conversation ;
- navigation mobile ;
- focus et dialog.

Ces tests sont des **tests de comportement au niveau écran**, pas des E2E navigateur.

## E2E

Des tests Playwright seraient le niveau naturel pour valider :

- rendu dans un vrai navigateur ;
- responsive ;
- clavier ;
- focus ;
- transitions desktop/mobile ;
- comportements que jsdom ne peut pas prouver complètement.

Ils constituent une évolution possible et ne remplacent pas les tests unitaires ou RTL.

---

# 26. Couverture de la suite

La suite actuelle annonce **64 tests orientés comportement** et couvre notamment :

- timestamps seconds / milliseconds / numeric strings / ISO / garbage ;
- coercition des ids et des enregistrements à la frontière API ;
- sender vs recipient ;
- tri initial et re-tri après envoi / création ;
- sélection ;
- lazy load ;
- empty state ;
- send success / failure ;
- draft preservation ;
- duplicate submit ;
- fast switching / late response ;
- retry (inbox et messages) ;
- erreurs serveur 5xx avec message utilisateur sûr ;
- création de conversation (dialog, focus trap, échec) ;
- mutations de l’inbox ;
- focus restoration ;
- formatage des dates et frontières de minuit.

Non couvert directement à ce jour : le mapping exact de chaque statut HTTP (404/4xx), les réponses JSON invalides et l’absence des tokens dans le state (les fixtures incluent des tokens, mais aucune assertion ne les vérifie explicitement).

Le nombre doit être conservé synchronisé avec le tree final du projet ; le point important est surtout la couverture des comportements critiques.

---

# 27. Pourquoi combiner unitaires et tests d’écran ?

Un test unitaire peut prouver :

```text
normalizeTimestamp(input) === expected
```

Mais l’envoi d’un message traverse plusieurs couches :

```text
composer
   ↓
callback
   ↓
API
   ↓
succès / erreur
   ↓
cache message
   ↓
conversation list
   ↓
UI
```

Les tests d’écran permettent donc de vérifier le workflow complet à un niveau plus proche de l’utilisateur, tandis que les tests unitaires protègent la logique pure avec des tests rapides et précis.

---

# 28. Alternatives volontairement rejetées

| Décision | Alternative | Raisonnement |
|---|---|---|
| Pages Router conservé | App Router | Aucun bénéfice concret requis par le test |
| State local | Redux / Zustand | Surface de state limitée |
| Hooks locaux | TanStack Query | Revalidation/cache plus puissants, mais pas nécessaires ici |
| REST uniquement | WebSocket | Aucun contrat realtime fourni |
| Pas de polling | Polling | Pas de `since` / cursor / message ID incrémental |
| Pas de BFF | API Route / proxy Next.js | Pas de besoin d’agrégation ou de traduction |
| CSS Modules | Tailwind / MUI / styled-components | Petite UI + conventions existantes |
| Cache par conversation | Refetch à chaque sélection | Réduction des requêtes inutiles |
| State par ID | request-id global | Une réponse tardive reste isolée par ressource |
| Pas de retry automatique POST | Retry automatique | Risque de doublon sans idempotence |
| Pas de fake pagination | Pagination simulée frontend | Aucun cursor réel fourni par le backend |
| Pas de virtualisation immédiate | Virtual list | À justifier lorsque le volume réel le nécessite |

Ces choix sont **spécifiques à ce test**. Ils ne constituent pas un jugement universel sur les technologies rejetées.

---

# 29. Limites connues

Le fixture API n’est pas un backend de messagerie de production.

Limites principales :

- absence de realtime ;
- absence de pagination/cursor ;
- absence d’idempotence explicite ;
- divergences Swagger/runtime ;
- comportements spécifiques de json-server ;
- absence d’un vrai modèle d’authentification/autorisation exposé par le test.

Ces limitations sont documentées plutôt que masquées derrière une architecture frontend artificielle.

---

# 30. Évolution production

Avec un backend réel, l’architecture pourrait évoluer vers :

```text
                    ┌────────────────────┐
                    │ API / Message svc  │
                    └─────────┬──────────┘
                              │
                    ┌─────────▼──────────┐
                    │ Storage + events   │
                    └──────┬───────┬─────┘
                           │       │
                         REST    Events
                           │       │
                           │   ┌───▼────────────┐
                           │   │ Realtime GW    │
                           │   └───┬────────────┘
                           │       │
                           └───┬───┘
                               ▼
                            Browser
```

Évolutions naturelles :

1. historique par curseur ;
2. “load older” ;
3. WebSocket/SSE ;
4. reconnexion + backoff ;
5. récupération des événements manqués ;
6. déduplication ;
7. idempotency keys ;
8. optimistic update avec réconciliation ;
9. authentification réelle ;
10. virtualisation lorsque le volume le justifie.

---

# 31. Avec plus de temps

Les améliorations les plus utiles seraient :

- tests E2E Playwright desktop + mobile ;
- matrice automatisée de viewports ;
- formatage des dates selon la locale utilisateur ;
- instrumentation performance avant toute micro-optimisation ;
- virtualisation après introduction réelle de pagination/cursors.

L’idée n’est pas d’ajouter de l’architecture pour “faire plus”, mais de l’ajouter lorsqu’un besoin mesurable le justifie.

---

# 32. Installation et lancement

## Installer

```bash
npm install
```

## API

Terminal 1 :

```bash
npm run start-server
```

API : `http://localhost:3005`

## Application

Terminal 2 :

```bash
npm run dev
```

Application : `http://localhost:3000`

---

# 33. Vérifications

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
```

Pour une validation finale, ces commandes doivent être exécutées sur le tree final et leurs résultats vérifiés avant soumission.

---

# 34. Principe de décision

Toutes les décisions importantes suivent la même logique :

```text
Besoin
  ↓
Contrainte observée
  ↓
Options possibles
  ↓
Compromis
  ↓
Décision
  ↓
Limitation assumée
  ↓
Évolution production si nécessaire
```

Cela permet de distinguer clairement :

> **ce qui est nécessaire pour le test**

de :

> **ce qui serait pertinent dans un produit de production.**

---

# 35. Résumé

Le projet privilégie :

```text
Contrat réel
    +
frontière API claire
    +
state local explicite
    +
cache par conversation
    +
gestion robuste de l’asynchronisme
    +
responsive
    +
accessibilité
    +
tests adaptés à chaque niveau
    +
trade-offs documentés
```

plutôt que :

```text
architecture spéculative
+
nouvelles dépendances
+
realtime artificiel
+
BFF inutile
+
pagination fictive
+
abstractions disproportionnées
```

Le résultat recherché est une solution **correcte, lisible, testable, robuste, accessible, responsive et facile à défendre techniquement en entretien**.
