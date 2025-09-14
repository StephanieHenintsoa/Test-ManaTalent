const express = require("express");
const cors = require("cors");
const { sequelize } = require("./config/db");
require("./models/Associations");

const userRoutes = require("./routes/userRoutes");
const entityRoutes = require("./routes/entityRoutes");
const userEntityRoutes = require("./routes/userEntityRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // Port de Vite (5173)
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/entities", entityRoutes);
app.use("/api/user-entities", userEntityRoutes);

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "Serveur Express.js fonctionnel !" });
});

// Route 404
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur interne du serveur" });
});

// Démarrage du serveur
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la base de données établie avec succès");
    
    await sequelize.sync({ alter: true });
    console.log("✅ Modèles synchronisés avec la base de données");
    
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Impossible de se connecter à la base de données:", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
