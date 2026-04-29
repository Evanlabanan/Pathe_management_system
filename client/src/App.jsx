import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

// Importation de TOUTES les pages de l'application
import BranchPage from './pages/setup/BranchPage';
import MoviePage from './pages/movies/MoviePage';
import TheaterPage from './pages/theaters/TheaterPage';
import TicketSalesPage from './pages/sales/TicketSalesPage';
import PatheReports from './pages/reports/PatheReports';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        
        <Routes>
          {/* Redirection par défaut */}
          <Route path="/" element={<Navigate to="/branches" replace />} />
          
          {/* Les 5 grandes sections du site */}
          <Route path="/branches" element={<BranchPage />} />
          <Route path="/movies" element={<MoviePage />} />
          <Route path="/theaters" element={<TheaterPage />} />
          <Route path="/sales" element={<TicketSalesPage />} />
          <Route path="/reports" element={<PatheReports />} />
          
          {/* Page 404 (Erreur de lien) */}
          <Route path="*" element={<h2 style={{ padding: '20px' }}>🚧 Page introuvable 🚧</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;