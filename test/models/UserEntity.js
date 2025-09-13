const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Entity = require("./Entity");

const UserEntity = sequelize.define("UserEntity", {
  id_user: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    references: { model: User, key: "id" },
    onDelete: "CASCADE"
  },
  id_entity: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    references: { model: Entity, key: "id" },
    onDelete: "CASCADE"
  },
  assigned_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "user_entity",
  timestamps: false
});

module.exports = UserEntity;
