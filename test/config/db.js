const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(" Connexion à MySQL réussie !");
  } catch (error) {
    console.error(" Impossible de se connecter à MySQL :", error);
  }
};

module.exports = { sequelize, testConnection };
