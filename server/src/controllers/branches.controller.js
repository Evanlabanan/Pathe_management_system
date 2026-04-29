import * as branchService from '../services/branches.service.js';

export async function getBranches(req, res) {
  try {
    const branches = await branchService.getAllBranches();
    res.json(branches); // On renvoie les données au format JSON
  } catch (error) {
    console.error("Erreur lors de la récupération des branches :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}