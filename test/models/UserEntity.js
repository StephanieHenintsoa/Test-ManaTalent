const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const UserEntity = sequelize.define('UserEntity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  id_entity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'entities',
      key: 'id'
    }
  },
  assigned_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'user_entity',
  timestamps: false,
  // Contrainte d'unicité sur la combinaison id_user + id_entity
  indexes: [
    {
      unique: true,
      fields: ['id_user', 'id_entity']
    }
  ]
});

module.exports = UserEntity;