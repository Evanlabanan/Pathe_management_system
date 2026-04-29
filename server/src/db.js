import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  // Il va récupérer l'URL depuis le docker-compose ou le .env
  connectionString: process.env.DATABASE_URL
});

pool.on('error', (err) => {
  console.error('Erreur inattendue de la base de données', err);
  process.exit(-1);
});