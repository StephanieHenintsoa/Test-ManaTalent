const User = require("./User");
const Entity = require("./Entity");
const UserEntity = require("./UserEntity");

// Définir les associations ici pour éviter les problèmes de dépendances circulaires
// ------------------------
// Associations Many-to-Many (pour les requêtes directes User/Entity)
// ------------------------
User.belongsToMany(Entity, {
  through: UserEntity,
  foreignKey: "id_user",
  otherKey: "id_entity",
  as: "Entities" // Alias pour éviter les conflits
});

Entity.belongsToMany(User, {
  through: UserEntity,
  foreignKey: "id_entity",
  otherKey: "id_user",
  as: "Users" // Alias pour éviter les conflits
});

// ------------------------
// Associations directes (pour les requêtes avec include sur UserEntity)
// ------------------------
UserEntity.belongsTo(User, {
  foreignKey: "id_user",
  as: "User"
});

UserEntity.belongsTo(Entity, {
  foreignKey: "id_entity",
  as: "Entity"
});

// Associations inverses (optionnelles mais recommandées)
User.hasMany(UserEntity, {
  foreignKey: "id_user",
  as: "UserEntities"
});

Entity.hasMany(UserEntity, {
  foreignKey: "id_entity",
  as: "EntityUsers"
});

module.exports = { User, Entity, UserEntity };