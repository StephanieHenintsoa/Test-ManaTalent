const { User, Entity, UserEntity } = require("../models"); // <-- depuis index.js

const userEntityController = {
  // Récupérer toutes les relations User-Entity
  getAllUserEntities: async (req, res) => {
    try {
      const userEntities = await UserEntity.findAll({
        include: [
          { model: User, as: "User", attributes: ["id", "username", "email"] },
          { model: Entity, as: "Entity", attributes: ["id", "name_entity", "description"] }
        ],
        order: [["assigned_at", "DESC"]]
      });
      

      res.status(200).json({
        success: true,
        data: userEntities,
        message: "Relations User-Entity récupérées avec succès"
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des relations User-Entity:", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la récupération des relations",
        error: error.message
      });
    }
  },

  // Récupérer une relation User-Entity par son ID
  getUserEntityById: async (req, res) => {
    try {
      const { id } = req.params;

      const userEntity = await UserEntity.findByPk(id, {
        include: [
          {
            model: User,
            as: "User",
            attributes: ["id", "username", "email"]
          },
          {
            model: Entity,
            as: "Entity",
            attributes: ["id", "name_entity", "description"]
          }
        ]
      });

      if (!userEntity) {
        return res.status(404).json({
          success: false,
          message: "Relation User-Entity introuvable"
        });
      }

      res.status(200).json({
        success: true,
        data: userEntity,
        message: "Relation User-Entity récupérée avec succès"
      });
    } catch (error) {
      console.error("Erreur lors de la récupération de la relation User-Entity:", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la récupération de la relation",
        error: error.message
      });
    }
  },

  // Créer une nouvelle relation User-Entity
  createUserEntity: async (req, res) => {
    try {
      const { id_user, id_entity } = req.body;

      // Vérifier si l'utilisateur existe
      const user = await User.findByPk(id_user);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur introuvable"
        });
      }

      // Vérifier si l'entité existe
      const entity = await Entity.findByPk(id_entity);
      if (!entity) {
        return res.status(404).json({
          success: false,
          message: "Entité introuvable"
        });
      }

      // Vérifier si la relation existe déjà
      const existingRelation = await UserEntity.findOne({
        where: { id_user, id_entity }
      });

      if (existingRelation) {
        return res.status(409).json({
          success: false,
          message: "Cette relation existe déjà"
        });
      }

      // Créer la nouvelle relation
      const newUserEntity = await UserEntity.create({
        id_user,
        id_entity
      });

      // Récupérer la relation créée avec les données associées
      const createdRelation = await UserEntity.findOne({
        where: { id_user, id_entity },
        include: [
          {
            model: User,
            as: "User",
            attributes: ["id", "username", "email"]
          },
          {
            model: Entity,
            as: "Entity",
            attributes: ["id", "name_entity", "description"]
          }
        ]
      });

      res.status(201).json({
        success: true,
        data: createdRelation,
        message: "Relation User-Entity créée avec succès"
      });
    } catch (error) {
      console.error("Erreur lors de la création de la relation User-Entity:", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la création de la relation",
        error: error.message
      });
    }
  },

  // Supprimer une association (DELETE /user-entities/:id)
  deleteUserEntity: async (req, res) => {
    try {
      const { id } = req.params;

      const userEntity = await UserEntity.findByPk(id);
      if (!userEntity) {
        return res.status(404).json({
          success: false,
          message: "Association introuvable"
        });
      }

      await userEntity.destroy();

      res.status(200).json({
        success: true,
        message: "Association supprimée avec succès"
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'association:", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la suppression de l'association",
        error: error.message
      });
    }
  },

  // Supprimer une relation par User et Entity IDs (pour compatibilité)
  deleteUserEntityByIds: async (req, res) => {
    try {
      const { id_user, id_entity } = req.params;

      const deletedRows = await UserEntity.destroy({
        where: { id_user, id_entity }
      });

      if (deletedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Relation introuvable"
        });
      }

      res.status(200).json({
        success: true,
        message: "Relation supprimée avec succès"
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de la relation User-Entity:", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la suppression de la relation",
        error: error.message
      });
    }
  },

  // Récupérer les entités d'un utilisateur spécifique
  getUserEntities: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await User.findByPk(userId, {
        include: [
          {
            model: Entity,
            as: "Entities",
            through: {
              attributes: ["assigned_at"]
            }
          }
        ]
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur introuvable"
        });
      }

      res.status(200).json({
        success: true,
        data: user,
        message: "Entités de l'utilisateur récupérées avec succès"
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des entités de l'utilisateur:", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la récupération des entités",
        error: error.message
      });
    }
  },
  // Mettre à jour une relation User-Entity
updateUserEntity: async (req, res) => {
  try {
    const { id } = req.params;
    const { id_user, id_entity } = req.body;

    // Vérifier si la relation existe
    const userEntity = await UserEntity.findByPk(id);
    if (!userEntity) {
      return res.status(404).json({
        success: false,
        message: "Relation User-Entity introuvable"
      });
    }

    // Si id_user est fourni, vérifier que l'utilisateur existe
    if (id_user) {
      const user = await User.findByPk(id_user);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur introuvable"
        });
      }
    }

    // Si id_entity est fourni, vérifier que l'entité existe
    if (id_entity) {
      const entity = await Entity.findByPk(id_entity);
      if (!entity) {
        return res.status(404).json({
          success: false,
          message: "Entité introuvable"
        });
      }
    }

    // Vérifier si la nouvelle combinaison existe déjà (si les deux IDs sont modifiés)
    if (id_user && id_entity) {
      const existingRelation = await UserEntity.findOne({
        where: { 
          id_user, 
          id_entity,
          id: { [require('sequelize').Op.ne]: id } // Exclure la relation actuelle
        }
      });

      if (existingRelation) {
        return res.status(409).json({
          success: false,
          message: "Cette relation existe déjà"
        });
      }
    }

    // Mettre à jour la relation
    await userEntity.update({
      ...(id_user && { id_user }),
      ...(id_entity && { id_entity })
    });

    // Récupérer la relation mise à jour avec les données associées
    const updatedRelation = await UserEntity.findByPk(id, {
      include: [
        {
          model: User,
          as: "User",
          attributes: ["id", "username", "email"]
        },
        {
          model: Entity,
          as: "Entity",
          attributes: ["id", "name_entity", "description"]
        }
      ]
    });

    res.status(200).json({
      success: true,
      data: updatedRelation,
      message: "Relation User-Entity mise à jour avec succès"
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la relation User-Entity:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la mise à jour de la relation",
      error: error.message
    });
  }
},

  // Récupérer les utilisateurs d'une entité spécifique
  getEntityUsers: async (req, res) => {
    try {
      const { entityId } = req.params;

      const entity = await Entity.findByPk(entityId, {
        include: [
          {
            model: User,
            as: "Users",
            attributes: ["id", "username", "email"],
            through: {
              attributes: ["assigned_at"]
            }
          }
        ]
      });

      if (!entity) {
        return res.status(404).json({
          success: false,
          message: "Entité introuvable"
        });
      }

      res.status(200).json({
        success: true,
        data: entity,
        message: "Utilisateurs de l'entité récupérés avec succès"
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs de l'entité:", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la récupération des utilisateurs",
        error: error.message
      });
    }
  }
};


module.exports = userEntityController;