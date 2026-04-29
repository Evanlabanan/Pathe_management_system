import { useEffect, useState } from 'react'
import { http } from './api/http'
import './App.css'

function App() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    http.get('/api/branches')
      .then(response => {
        setBranches(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur de connexion à l'API:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>🐘 Pathé Management System</h1>
      <h2>Liste de nos succursales :</h2>

      {loading ? (
        <p>Chargement des cinémas...</p>
      ) : (
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          {branches.map(branch => (
            <li key={branch.branch_id}>
              <strong>{branch.branch_name}</strong> ({branch.branch_code}) - Situé à {branch.location_city}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App