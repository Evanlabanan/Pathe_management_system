import { useState, useEffect } from 'react';
import { http } from '../../api/http';

export default function PatheReports() {
  const [activeTab, setActiveTab] = useState('receipt');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  // Données pour les listes LoV
  const [theaterList, setTheaterList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  // États des filtres
  const [receiptNo, setReceiptNo] = useState('');
  const [dates, setDates] = useState({ start: '2026-03-01', end: '2026-03-31' });
  const [perfFilters, setPerfFilters] = useState({ theater: '', movie: '' });

  // Style des "Gros Rectangles"
  const boxStyle = {
    padding: '15px',
    fontSize: '16px',
    borderRadius: '10px',
    border: '2px solid #ddd',
    width: '100%',
    backgroundColor: '#fff',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center'
  };

  // Chargement des listes au démarrage
  useEffect(() => {
    http.get('/api/reports/theaters').then(res => setTheaterList(res.data)).catch(e => console.log(e));
    http.get('/api/reports/movies').then(res => setMovieList(res.data)).catch(e => console.log(e));
  }, []);

  const executeSearch = (type) => {
    setLoading(true);
    setError('');
    let url = '';
    
    if (type === 'receipt') url = `/api/reports/receipt/${receiptNo}`;
    else if (type === 'sales') url = `/api/reports/sales?from=${dates.start}&to=${dates.end}`;
    else if (type === 'performance') {
      url = `/api/reports/performance?start=${dates.start}&end=${dates.end}&theater=${perfFilters.theater}&movie=${perfFilters.movie}`;
    }

    http.get(url)
      .then(res => { setData(res.data); setLoading(false); })
      .catch(() => { setError("No data found."); setData([]); setLoading(false); });
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>📊 Pathé Reports Center</h2>
      
      {/* Onglets style Pathé */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px' }}>
        {['receipt', 'sales', 'performance'].map(t => (
          <button key={t} onClick={() => { setActiveTab(t); setData([]); }} 
                  style={{ 
                    padding: '12px 25px', 
                    borderRadius: '25px',
                    border: '2px solid #e50914',
                    background: activeTab === t ? '#e50914' : 'transparent',
                    color: activeTab === t ? 'white' : '#e50914',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ background: '#f9f9f9', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        
        {/* PERFORMANCE ANALYSIS : La grille corrigée */}
        {activeTab === 'performance' && (
          <div>
            <h3 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>PERFORMANCE ANALYSIS FILTERS</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '25px', marginBottom: '25px' }}>
              <div>
                <label style={labelStyle}>Start Date</label>
                <input type="date" style={boxStyle} value={dates.start} onChange={e => setDates({...dates, start: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>End Date</label>
                <input type="date" style={boxStyle} value={dates.end} onChange={e => setDates({...dates, end: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Theater (LoV)</label>
                <select style={boxStyle} value={perfFilters.theater} onChange={e => setPerfFilters({...perfFilters, theater: e.target.value})}>
                  <option value="">-- All Theaters --</option>
                  {theaterList.map(t => <option key={t.theater_id} value={t.theater_id}>{t.theater_code}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '25px', marginBottom: '30px' }}>
              <div>
                <label style={labelStyle}>Movie (LoV)</label>
                <select style={boxStyle} value={perfFilters.movie} onChange={e => setPerfFilters({...perfFilters, movie: e.target.value})}>
                  <option value="">-- All Movies --</option>
                  {movieList.map(m => <option key={m.movie_id} value={m.movie_id}>{m.name_of_movie}</option>)}
                </select>
              </div>
            </div>

            <button onClick={() => executeSearch('performance')} 
                    style={{ width: '20%', padding: '20px', background: '#e50914', color: 'white', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
              RUN FULL ANALYSIS
            </button>
          </div>
        )}

        {/* Autres onglets simplifiés pour l'exemple */}
        {activeTab === 'receipt' && (
           <div style={{ textAlign: 'center' }}>
              <input type="text" placeholder="REC-XXXXX" style={{...boxStyle, width: '300px', marginRight: '10px'}} value={receiptNo} onChange={e => setReceiptNo(e.target.value)} />
              <button onClick={() => executeSearch('receipt')} style={{padding: '15px 30px', background: '#333', color: 'white', border: 'none', borderRadius: '10px'}}>SEARCH</button>
           </div>
        )}

        {activeTab === 'sales' && (
           <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <input type="date" style={boxStyle} value={dates.start} onChange={e => setDates({...dates, start: e.target.value})} />
              <input type="date" style={boxStyle} value={dates.end} onChange={e => setDates({...dates, end: e.target.value})} />
              <button onClick={() => executeSearch('sales')} style={{padding: '15px 30px', background: '#e50914', color: 'white', border: 'none', borderRadius: '10px'}}>VIEW</button>
           </div>
        )}

        <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #eee' }} />

        {/* Tableau des résultats */}
        {loading && <p style={{textAlign: 'center'}}>Loading...</p>}
        {data.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#333', color: 'white' }}>
                <tr>
                  {Object.keys(data[0]).map(k => <th key={k} style={{ padding: '15px', textAlign: 'left' }}>{k.toUpperCase()}</th>)}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                    {Object.values(row).map((v, j) => <td key={j} style={{ padding: '15px' }}>{v}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}