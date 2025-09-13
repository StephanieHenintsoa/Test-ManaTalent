const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require("../models/User");

const Entity = sequelize.define('entity', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  name_entity: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'entity', //nom de la table 
  timestamps: false, 
});

module.exports = Entity;