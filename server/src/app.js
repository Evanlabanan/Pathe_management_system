import express from "express";
import cors from "cors";
import branchesRoutes from "./routes/branches.routes.js";
import reportsRoutes from "./routes/reports.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.json({ message: "Le serveur Pathé est 100% opérationnel ! 🍿" });
});

// On dit à l'API d'utiliser notre route pour les succursales
app.use("/api/branches", branchesRoutes);
app.use("/api/reports", reportsRoutes);
export default app;