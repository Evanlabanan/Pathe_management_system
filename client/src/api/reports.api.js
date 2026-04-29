import { http } from './http';

export const reportsApi = {
  // 1. Récupérer un reçu
  getReceipt: (id) => http.get(`/api/reports/receipt/${id}`),

  // 2. Historique des ventes
  getSales: (from, to) => http.get(`/api/reports/sales?from=${from}&to=${to}`),

  // 3. Analyse de performance
  getPerformance: (params) => {
    const { start, end, theater, movie } = params;
    let url = `/api/reports/performance?start=${start}&end=${end}`;
    if (theater) url += `&theater=${theater}`;
    if (movie) url += `&movie=${movie}`;
    return http.get(url);
  },

  // 4. Listes pour les sélecteurs (LoV)
  getTheaters: () => http.get('/api/reports/theaters'),
  getMovies: () => http.get('/api/reports/movies')
};