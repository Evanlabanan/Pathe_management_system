import { useEffect, useState } from 'react';
import { http } from '../../api/http'; // <-- Seulement DEUX "../" !

export default function BranchPage() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    http.get('/api/branches')
      .then(response => {
        setBranches(response.data);
        setLoading(false);
      })
      .catch(error => console.error("Erreur API :", error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📍 Directory of Pathé Branches</h2>
      {loading ? <p>Chargement...</p> : (
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          {branches.map(branch => (
            <li key={branch.branch_id}>
              <strong>{branch.branch_name}</strong> ({branch.branch_code}) - {branch.location_city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}