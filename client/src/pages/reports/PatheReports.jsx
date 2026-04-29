import { useState, useEffect } from 'react';
import { reportsApi } from '../../api/reports.api'; // On importe notre "standardiste"

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

  // Styles "Nickel Chrome"
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

  // Chargement des listes au démarrage via l'API
  useEffect(() => {
    reportsApi.getTheaters().then(res => setTheaterList(res.data)).catch(e => console.error(e));
    reportsApi.getMovies().then(res => setMovieList(res.data)).catch(e => console.error(e));
  }, []);

  // La fonction de recherche qui utilise le service reportsApi
  const executeSearch = async (type) => {
    setLoading(true);
    setError('');
    try {
      let response;
      if (type === 'receipt') {
        response = await reportsApi.getReceipt(receiptNo);
      } else if (type === 'sales') {
        response = await reportsApi.getSales(dates.start, dates.end);
      } else if (type === 'performance') {
        response = await reportsApi.getPerformance({
          start: dates.start,
          end: dates.end,
          theater: perfFilters.theater,
          movie: perfFilters.movie
        });
      }
      
      if (response.data.length === 0) setError("No data found for this selection.");
      setData(response.data);
    } catch (err) {
      setError("An error occurred while fetching data.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>📊 Pathé Reports Center</h2>
      
      {/* Navigation Onglets */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px' }}>
        {['receipt', 'sales', 'performance'].map(t => (
          <button key={t} onClick={() => { setActiveTab(t); setData([]); setError(''); }} 
                  style={{ 
                    padding: '12px 25px', 
                    borderRadius: '25px',
                    border: '2px solid #e50914',
                    background: activeTab === t ? '#e50914' : 'transparent',
                    color: activeTab === t ? 'white' : '#e50914',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: '0.3s'
                  }}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ background: '#f9f9f9', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        
        {/* ONGLET RECEIPT */}
        {activeTab === 'receipt' && (
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '20px' }}>FIND A SPECIFIC RECEIPT</h3>
            <input type="text" placeholder="REC-XXXXX" style={{...boxStyle, width: '300px', marginRight: '10px'}} 
                   value={receiptNo} onChange={e => setReceiptNo(e.target.value)} />
            <button onClick={() => executeSearch('receipt')} 
                    style={{padding: '15px 30px', background: '#333', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold'}}>
              SEARCH
            </button>
          </div>
        )}

        {/* ONGLET SALES */}
        {activeTab === 'sales' && (
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '20px' }}>SALES HISTORY PERIOD</h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
              <input type="date" style={boxStyle} value={dates.start} onChange={e => setDates({...dates, start: e.target.value})} />
              <span style={{fontWeight: 'bold'}}>TO</span>
              <input type="date" style={boxStyle} value={dates.end} onChange={e => setDates({...dates, end: e.target.value})} />
              <button onClick={() => executeSearch('sales')} 
                      style={{padding: '15px 30px', background: '#e50914', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold'}}>
                VIEW SALES
              </button>
            </div>
          </div>
        )}

        {/* ONGLET PERFORMANCE */}
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
            <div style={{ marginBottom: '30px' }}>
              <label style={labelStyle}>Movie (LoV)</label>
              <select style={boxStyle} value={perfFilters.movie} onChange={e => setPerfFilters({...perfFilters, movie: e.target.value})}>
                <option value="">-- All Movies --</option>
                {movieList.map(m => <option key={m.movie_id} value={m.movie_id}>{m.name_of_movie}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={() => executeSearch('performance')} 
                      style={{ padding: '12px 40px', background: '#e50914', color: 'white', border: 'none', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(229, 9, 20, 0.3)' }}>
                RUN FULL ANALYSIS
              </button>
            </div>
          </div>
        )}

        <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #eee' }} />

        {/* AFFICHAGE DES RÉSULTATS */}
        {loading && <p style={{textAlign: 'center', fontSize: '18px'}}>⏳ Loading data...</p>}
        {error && <p style={{color: 'red', textAlign: 'center', fontWeight: 'bold'}}>{error}</p>}
        
        {data.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
              <thead style={{ background: '#333', color: 'white' }}>
                <tr>
                  {Object.keys(data[0]).map(k => <th key={k} style={{ padding: '15px', textAlign: 'left', fontSize: '12px', textTransform: 'uppercase' }}>{k.replace('_', ' ')}</th>)}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                    {Object.values(row).map((v, j) => <td key={j} style={{ padding: '15px', fontSize: '14px', color: '#444' }}>{v}</td>)}
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