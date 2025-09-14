const express = require("express");
const cors = require("cors");
const { testConnection, sequelize } = require("./config/db");
const entityRoutes = require("./routes/entityRoutes");
const userRoutes = require("./routes/userRoutes");
const userEntityRoutes = require("./routes/userEntityRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS ESSENTIEL
app.use(cors({
  origin: "http://localhost:5173", // Port de Vite (5173 au lieu de 8080)
  credentials: true
}));

app.use(express.json());
testConnection();

sequelize.sync({ alter: true })
  .then(() => console.log("Modèles synchronisés"))
  .catch(err => console.error("Erreur de sync:", err));

// Routes
app.use("/api/entities", entityRoutes);
app.use("/api/users", userRoutes);
app.use("/api/user-entities", userEntityRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello Express + MySQL 🚀" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});

app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));