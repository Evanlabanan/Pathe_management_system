import express from "express";
import cors from "cors";
import branchesRoutes from "./routes/branches.routes.js"; // <-- AJOUT 1

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.json({ message: "Le serveur Pathé est 100% opérationnel ! 🍿" });
});

// On dit à l'API d'utiliser notre route pour les succursales
app.use("/api/branches", branchesRoutes); // <-- AJOUT 2

export default app;