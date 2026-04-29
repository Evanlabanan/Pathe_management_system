import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#e50914', color: 'white', marginBottom: '20px', borderRadius: '8px' }}>
      <h2 style={{ margin: 0 }}>🐘 Pathé Management System</h2>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '15px', padding: 0, marginTop: '10px' }}>
        <li><Link to="/branches" style={{ color: 'white', textDecoration: 'none' }}>Branches</Link></li>
        <li><Link to="/movies" style={{ color: 'white', textDecoration: 'none' }}>Movies</Link></li>
        <li><Link to="/theaters" style={{ color: 'white', textDecoration: 'none' }}>Theaters</Link></li>
        <li><Link to="/sales" style={{ color: 'white', textDecoration: 'none' }}>Sales</Link></li>
        <li><Link to="/reports" style={{ color: 'white', textDecoration: 'none' }}>Reports</Link></li>
      </ul>
    </nav>
  );
}