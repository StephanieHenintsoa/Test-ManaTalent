// controllers/userEntityController.js
const User = require("../models/User");
const Entity = require("../models/Entity");
const UserEntity = require("../models/UserEntity");

// ------------------------
// Assigner une entité à un utilisateur
// POST /api/user-entities/assign
// ------------------------
const assignEntityToUser = async (req, res) => {
  try {
    const { userId, entityId } = req.body;

    // Vérifier que l'utilisateur et l'entité existent
    const user = await User.findByPk(userId);
    const entity = await Entity.findByPk(entityId);

    if (!user || !entity) {
      return res.status(404).json({ 
        message: "Utilisateur ou entité non trouvée",
        userFound: !!user,
        entityFound: !!entity
      });
    }

    // Vérifier si l'association existe déjà
    const existingAssociation = await UserEntity.findOne({
      where: { 
        id_user: userId, 
        id_entity: entityId 
      }
    });

    if (existingAssociation) {
      return res.status(409).json({ 
        message: "Cette entité est déjà assignée à cet utilisateur" 
      });
    }

    // Créer l'association
    const userEntity = await UserEntity.create({
      id_user: userId,
      id_entity: entityId
    });

    res.status(201).json({ 
      message: "Entité assignée à l'utilisateur avec succès",
      data: userEntity
    });
  } catch (err) {
    console.error('Erreur assignEntityToUser:', err);
    res.status(500).json({ error: err.message });
  }
};

// ------------------------
// Récupérer toutes les entités d'un utilisateur
// GET /api/user-entities/user/:userId
// ------------------------
const getEntitiesOfUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Vérifier que l'utilisateur existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Récupérer les entités de l'utilisateur
    const userWithEntities = await User.findByPk(userId, {
      include: [
        {
          model: Entity,
          through: { attributes: ['id', 'created_at'] }, // Inclure les données de la table de liaison
          attributes: ["id", "name_entity", "description"]
        }
      ],
      attributes: ["id", "username", "email"]
    });

    res.status(200).json({
      user: userWithEntities,
      entitiesCount: userWithEntities.Entities ? userWithEntities.Entities.length : 0
    });
  } catch (err) {
    console.error('Erreur getEntitiesOfUser:', err);
    res.status(500).json({ error: err.message });
  }
};

// ------------------------
// Récupérer tous les utilisateurs liés à une entité
// GET /api/user-entities/entity/:entityId
// ------------------------
const getUsersOfEntity = async (req, res) => {
  try {
    const { entityId } = req.params;

    // Vérifier que l'entité existe
    const entity = await Entity.findByPk(entityId);
    if (!entity) {
      return res.status(404).json({ message: "Entité non trouvée" });
    }

    // Récupérer les utilisateurs de l'entité
    const entityWithUsers = await Entity.findByPk(entityId, {
      include: [
        {
          model: User,
          as: "Users", // Utiliser l'alias défini dans les associations
          through: { attributes: ['id', 'created_at'] }, // Inclure les données de la table de liaison
          attributes: ["id", "username", "email"]
        }
      ],
      attributes: ["id", "name_entity", "description"]
    });

    res.status(200).json({
      entity: entityWithUsers,
      usersCount: entityWithUsers.Users ? entityWithUsers.Users.length : 0
    });
  } catch (err) {
    console.error('Erreur getUsersOfEntity:', err);
    res.status(500).json({ error: err.message });
  }
};

// ------------------------
// Retirer une entité d'un utilisateur
// DELETE /api/user-entities/remove
// ------------------------
const removeEntityFromUser = async (req, res) => {
  try {
    const { userId, entityId } = req.body;

    if (!userId || !entityId) {
      return res.status(400).json({ 
        message: "userId et entityId sont requis dans le body" 
      });
    }

    // Trouver l'association
    const association = await UserEntity.findOne({
      where: { 
        id_user: userId, 
        id_entity: entityId 
      }
    });

    if (!association) {
      return res.status(404).json({ 
        message: "Association non trouvée entre cet utilisateur et cette entité" 
      });
    }

    // Supprimer l'association
    await association.destroy();

    res.status(200).json({ 
      message: "Entité retirée de l'utilisateur avec succès",
      removedAssociation: {
        userId,
        entityId
      }
    });
  } catch (err) {
    console.error('Erreur removeEntityFromUser:', err);
    res.status(500).json({ error: err.message });
  }
};

// ------------------------
// Mettre à jour l'entité d'un utilisateur
// PUT /api/user-entities/update
// ------------------------
const updateEntityOfUser = async (req, res) => {
  try {
    const { userId, oldEntityId, newEntityId } = req.body;

    if (!userId || !oldEntityId || !newEntityId) {
      return res.status(400).json({ 
        message: "userId, oldEntityId et newEntityId sont requis" 
      });
    }

    // Vérifier que la nouvelle entité existe
    const newEntity = await Entity.findByPk(newEntityId);
    if (!newEntity) {
      return res.status(404).json({ message: "Nouvelle entité non trouvée" });
    }

    // Trouver l'association existante
    const association = await UserEntity.findOne({
      where: { 
        id_user: userId, 
        id_entity: oldEntityId 
      }
    });

    if (!association) {
      return res.status(404).json({ 
        message: "Association existante non trouvée" 
      });
    }

    // Vérifier si la nouvelle association existe déjà
    const existingNewAssociation = await UserEntity.findOne({
      where: { 
        id_user: userId, 
        id_entity: newEntityId 
      }
    });

    if (existingNewAssociation) {
      return res.status(409).json({ 
        message: "L'utilisateur est déjà associé à cette nouvelle entité" 
      });
    }

    // Mettre à jour l'association
    association.id_entity = newEntityId;
    await association.save();

    res.status(200).json({ 
      message: "Entité de l'utilisateur mise à jour avec succès", 
      updatedAssociation: association 
    });
  } catch (err) {
    console.error('Erreur updateEntityOfUser:', err);
    res.status(500).json({ error: err.message });
  }
};

// ------------------------
// Lister toutes les relations user-entity
// GET /api/user-entities/all
// ------------------------
const getAllUserEntities = async (req, res) => {
  try {
    const associations = await UserEntity.findAll({
      include: [
        { 
          model: User, 
          as: 'User',
          attributes: ["id", "username", "email"] 
        },
        { 
          model: Entity, 
          as: 'Entity',
          attributes: ["id", "name_entity", "description"] 
        }
      ]
    });

    res.status(200).json({
      associations,
      total: associations.length
    });
  } catch (err) {
    console.error('Erreur getAllUserEntities:', err);
    res.status(500).json({ error: err.message });
  }
};

// ------------------------
// FONCTIONS SUPPLÉMENTAIRES (garder pour compatibilité)
// ------------------------

// Créer une association (alias pour assignEntityToUser)
const createUserEntity = assignEntityToUser;

// Récupérer une association par ID
const getUserEntityById = async (req, res) => {
  try {
    const { id } = req.params;
    const association = await UserEntity.findByPk(id, {
      include: [
        { model: User, attributes: ["id", "username", "email"] },
        { model: Entity, attributes: ["id", "name_entity", "description"] }
      ]
    });

    if (!association) {
      return res.status(404).json({ message: "Association non trouvée" });
    }

    res.status(200).json(association);
  } catch (err) {
    console.error('Erreur getUserEntityById:', err);
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour une association par ID
const updateUserEntity = async (req, res) => {
  try {
    const { id } = req.params;
    const { newEntityId } = req.body;

    const association = await UserEntity.findByPk(id);
    if (!association) {
      return res.status(404).json({ message: "Association non trouvée" });
    }

    const entity = await Entity.findByPk(newEntityId);
    if (!entity) {
      return res.status(404).json({ message: "Nouvelle entité non trouvée" });
    }

    association.id_entity = newEntityId;
    await association.save();

    res.json({ message: "Association mise à jour", association });
  } catch (err) {
    console.error('Erreur updateUserEntity:', err);
    res.status(500).json({ error: err.message });
  }
};

// Supprimer une association par ID
const deleteUserEntity = async (req, res) => {
  try {
    const { id } = req.params;
    const association = await UserEntity.findByPk(id);
    if (!association) {
      return res.status(404).json({ message: "Association non trouvée" });
    }

    await association.destroy();
    res.json({ message: "Association supprimée avec succès" });
  } catch (err) {
    console.error('Erreur deleteUserEntity:', err);
    res.status(500).json({ error: err.message });
  }
};

// ------------------------
// EXPORTS
// ------------------------
module.exports = {
  // Fonctions principales utilisées dans userRoutes.js
  assignEntityToUser,
  getEntitiesOfUser,
  getUsersOfEntity,
  removeEntityFromUser,
  updateEntityOfUser,
  getAllUserEntities,
  
  // Fonctions supplémentaires pour compatibilité
  createUserEntity,
  getUserEntityById,
  updateUserEntity,
  deleteUserEntity
};