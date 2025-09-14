const express = require("express");
const router = express.Router();
const userEntityController = require("../controllers/userEntityController");

// Routes spécifiques DOIVENT être déclarées AVANT les routes avec paramètres
// Récupérer toutes les associations
router.get("/all", userEntityController.getAllUserEntities);

// Récupérer les entités d'un utilisateur spécifique
router.get("/user/:userId", userEntityController.getUserEntities);

// Récupérer les utilisateurs d'une entité spécifique
router.get("/entity/:entityId", userEntityController.getEntityUsers);

// Routes CRUD principales
// Récupérer toutes les associations (route principale)
router.get("/", userEntityController.getAllUserEntities);

// Associer une entité à un utilisateur (POST /user-entities)
router.post("/", userEntityController.createUserEntity);

// Récupérer une association par son ID (doit être après les routes spécifiques)
router.get("/:id", userEntityController.getUserEntityById);

// Mettre à jour une association (PUT /user-entities/:id)
router.put("/:id", userEntityController.updateUserEntity);

// Supprimer une association (DELETE /user-entities/:id)
router.delete("/:id", userEntityController.deleteUserEntity);

// Supprimer une relation par User et Entity IDs (pour compatibilité)
router.delete("/:id_user/:id_entity", userEntityController.deleteUserEntityByIds);

module.exports = router;