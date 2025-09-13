const express = require("express");
const router = express.Router();
const userEntityController = require("../controllers/userEntityController");

// User - Entity relations
router.post("/assign", userEntityController.assignEntityToUser);      
// POST   http://localhost:3000/api/user-entity/assign
// Assigner une entité à un utilisateur

router.get("/user/:userId", userEntityController.getEntitiesOfUser);  
// GET    http://localhost:3000/api/user-entity/user/:userId
// Récupérer toutes les entités d’un utilisateur

router.get("/entity/:entityId", userEntityController.getUsersOfEntity); 
// GET    http://localhost:3000/api/user-entity/entity/:entityId
// Récupérer tous les utilisateurs liés à une entité

router.delete("/remove", userEntityController.removeEntityFromUser);  
// DELETE http://localhost:3000/api/user-entity/remove
// Retirer une entité d’un utilisateur (requête avec body)

router.put("/update", userEntityController.updateEntityOfUser);       
// PUT    http://localhost:3000/api/user-entity/update
// Mettre à jour l’entité d’un utilisateur

router.get("/all", userEntityController.getAllUserEntities);          
// GET    http://localhost:3000/api/user-entity/all
// Lister toutes les relations user-entity

module.exports = router;