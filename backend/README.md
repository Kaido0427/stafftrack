# 📚 StaffTrack API - Documentation

API REST pour la gestion du cahier de position administrative des agents.

**Base URL:** `http://localhost:3000/`

**Authentication:** Toutes les routes protégées nécessitent un token JWT dans le header `Authorization: Bearer <token>`

---

## 🔐 Routes d'Authentification (`/auth`)

### Routes Publiques

**POST /auth/register**
- Créer un nouveau compte (Agent, Responsable ou Admin)
- Le matricule est auto-généré (format: MAT250001)
- La direction est obligatoire pour AGENT et RESPONSABLE, optionnelle pour ADMIN

**POST /auth/login**
- Se connecter avec email et password
- Retourne un token JWT à utiliser pour les autres requêtes

**POST /auth/seed-admin**
- Créer le compte admin par défaut (email: admin@stafftrack.com, password: admin123)
- À utiliser une seule fois au démarrage de l'application

### Routes Protégées (nécessitent token)

**POST /auth/logout**
- Déconnecter l'utilisateur

**PUT /auth/update-password**
- Changer son mot de passe
- Nécessite l'ancien et le nouveau mot de passe

**PUT /auth/update-profile**
- Modifier ses informations (nom, prénoms, email, poste)
- Tous les champs sont optionnels, envoyez uniquement ce que vous voulez modifier

---

## 🏢 Routes Directions (`/directions`)

**Toutes les routes nécessitent authentification**

**POST /directions**
- Créer une nouvelle direction (réservé ADMIN)
- Nécessite code et libelle

**GET /directions**
- Récupérer toutes les directions avec leurs responsables
- Utilisé pour afficher la liste dans le dropdown lors de l'inscription

**GET /directions/:id**
- Récupérer une direction spécifique par son ID

**PUT /directions/:id**
- Mettre à jour une direction (code et/ou libelle)
- Réservé ADMIN

**DELETE /directions/:id**
- Supprimer une direction
- Réservé ADMIN

**PUT /directions/:id/assign-responsable**
- Assigner un responsable à une direction
- Nécessite l'ID du responsable dans le body
- Réservé ADMIN

---

## 👔 Routes Responsable (`/responsable`)

**Toutes les routes nécessitent authentification avec rôle RESPONSABLE**

**GET /responsable/agents**
- Voir tous les agents de sa direction
- Retourne les agents avec leurs 10 dernières positions et le total de positions

**GET /responsable/agents/:id**
- Voir un agent spécifique de sa direction
- Retourne l'agent avec toutes ses positions complètes

**GET /responsable/agents/:id/positions**
- Voir toutes les positions d'un agent spécifique
- Filtré par direction du responsable

---

## 👤 Routes Agent (`/agent`)

**Toutes les routes nécessitent authentification avec rôle AGENT**

**POST /agent/positions**
- Créer une nouvelle position administrative (absence, mission, déplacement, etc.)
- Types disponibles: MISSION_EXTERIEUR, MISSION_INTERIEUR, CONGE, PERMISSION, DEPLACEMENT_FORMATION, DEPLACEMENT_REUNION, MOTIF_PRIVE, MALADIE
- Statut par défaut: EN_ATTENTE

**GET /agent/positions**
- Récupérer toutes mes positions administratives
- Triées par date de début (plus récentes en premier)

**GET /agent/positions/:id**
- Récupérer une position spécifique par son ID
- Uniquement si elle appartient à l'agent connecté

**PUT /agent/positions/:id**
- Modifier une position existante
- Possible uniquement si le statut est EN_ATTENTE
- Tous les champs sont optionnels

**DELETE /agent/positions/:id**
- Supprimer une position
- Possible uniquement si le statut est EN_ATTENTE

---

## 📋 Workflow recommandé

### Démarrage de l'application
1. Appeler `POST /auth/seed-admin` pour créer l'admin
2. Se connecter avec le compte admin
3. Créer les directions via `POST /directions`

### Inscription utilisateurs
1. L'utilisateur récupère la liste des directions via `GET /directions`
2. Il choisit sa direction dans le formulaire d'inscription
3. Il s'inscrit via `POST /auth/register` avec l'ID de la direction choisie

### Gestion quotidienne
**Pour un Agent:**
- Créer ses positions via `POST /agent/positions`
- Consulter ses positions via `GET /agent/positions`
- Modifier/Supprimer si encore EN_ATTENTE

**Pour un Responsable:**
- Voir tous ses agents via `GET /responsable/agents`
- Consulter les positions d'un agent via `GET /responsable/agents/:id/positions`
- Exporter les rapports (à implémenter côté frontend)

**Pour l'Admin:**
- Gérer les directions
- Assigner les responsables aux directions
- Vue globale du système

---

## 🔑 Rôles et Permissions

**AGENT:**
- Gérer ses propres positions (CRUD)
- Voir son profil

**RESPONSABLE:**
- Toutes les permissions d'un agent
- Voir tous les agents de sa direction
- Voir toutes les positions de sa direction

**ADMIN:**
- Toutes les permissions
- Gérer les directions
- Gérer tous les utilisateurs du système

---

## ⚠️ Notes importantes

- Le matricule est auto-généré, ne pas l'envoyer lors de l'inscription
- Une position ne peut être modifiée/supprimée que si son statut est EN_ATTENTE
- Un responsable ne peut voir que les agents et positions de SA direction
- La direction est obligatoire pour les agents et responsables
- Toujours inclure le token JWT dans les headers pour les routes protégées