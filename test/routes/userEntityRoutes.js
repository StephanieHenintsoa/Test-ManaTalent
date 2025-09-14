const express = require("express");
const router = express.Router();
const userEntityController = require("../controllers/userEntityController");

router.post("/assign", userEntityController.assignEntityToUser);      

router.get("/user/:userId", userEntityController.getEntitiesOfUser);  

router.get("/entity/:entityId", userEntityController.getUsersOfEntity); 

router.delete("/remove", userEntityController.removeEntityFromUser);  

router.put("/update", userEntityController.updateEntityOfUser);       

router.get("/all", userEntityController.getAllUserEntities);         

module.exports = router;