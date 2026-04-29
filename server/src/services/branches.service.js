import { pool } from '../db.js';

export async function getAllBranches() {
  // On fait une requête SQL toute simple pour récupérer les succursales
  // Attention aux guillemets autour de "Branch" car PostgreSQL est sensible à la casse
  const result = await pool.query('SELECT * FROM "Branch" ORDER BY branch_id ASC');
  return result.rows;
}