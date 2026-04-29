import { pool } from '../db.js';

// 1. RAPPORT : PRINT RECEIPT
export async function getReceiptDetails(receiptNo) {
  const query = `
    SELECT 
      r.receipt_no, 
      m.name_of_movie, 
      th.theater_code, 
      TO_CHAR(s.show_date, 'YYYY-MM-DD') as show_date, 
      s.show_time, 
      se.row_no, 
      se.seat_no, 
      st.seat_type_code as seat_type
    FROM "Receipt" r
    JOIN "Showtime" s ON r.show_id = s.show_id
    JOIN "Movie" m ON s.movie_id = m.movie_id
    JOIN "Theater" th ON s.theater_id = th.theater_id
    JOIN "Ticket" t ON r.receipt_id = t.receipt_id
    JOIN "Seat" se ON t.seat_id = se.seat_id
    JOIN "SeatType" st ON se.seat_type_id = st.seat_type_id
    WHERE r.receipt_no = $1;
  `;
  const result = await pool.query(query, [receiptNo]);
  return result.rows;
}

// 2. RAPPORT : SALES HISTORY
export async function getSalesHistory(fromDate, toDate) {
  const query = `
    SELECT 
      TO_CHAR(r.receipt_date, 'YYYY-MM-DD') as receipt_date, 
      r.receipt_no, 
      m.name_of_movie, 
      se.row_no, 
      se.seat_no,
      r.total_paid as current_price
    FROM "Receipt" r
    JOIN "Showtime" s ON r.show_id = s.show_id
    JOIN "Movie" m ON s.movie_id = m.movie_id
    JOIN "Ticket" t ON r.receipt_id = t.receipt_id
    JOIN "Seat" se ON t.seat_id = se.seat_id
    WHERE r.receipt_date::date BETWEEN $1 AND $2
    ORDER BY r.receipt_date DESC;
  `;
  const result = await pool.query(query, [fromDate, toDate]);
  return result.rows;
}

// 3. RAPPORT : PERFORMANCE ANALYSIS
export async function getPerformanceAnalysis(startDate, endDate, theaterId, movieId, showId) {
  let query = `
    SELECT 
      m.name_of_movie, 
      th.theater_code, 
      COUNT(t.ticket_id) as total_tickets, 
      SUM(r.total_paid) as total_revenue
    FROM "Receipt" r
    JOIN "Showtime" s ON r.show_id = s.show_id
    JOIN "Movie" m ON s.movie_id = m.movie_id
    JOIN "Theater" th ON s.theater_id = th.theater_id
    JOIN "Ticket" t ON r.receipt_id = t.receipt_id
    WHERE r.receipt_date::date BETWEEN $1 AND $2
  `;

  const params = [startDate, endDate];
  let paramIndex = 3;

  if (theaterId) {
    query += ` AND s.theater_id = $${paramIndex++}`;
    params.push(theaterId);
  }
  if (movieId) {
    query += ` AND s.movie_id = $${paramIndex++}`;
    params.push(movieId);
  }
  if (showId) {
    query += ` AND s.show_id = $${paramIndex++}`;
    params.push(showId);
  }

  query += ` GROUP BY m.name_of_movie, th.theater_code ORDER BY total_revenue DESC`;
  
  const result = await pool.query(query, params);
  return result.rows;
}


export async function getAllTheaters() {
  const result = await pool.query('SELECT theater_id, theater_code FROM "Theater" ORDER BY theater_code');
  return result.rows;
}

export async function getAllMovies() {
  const result = await pool.query('SELECT movie_id, name_of_movie FROM "Movie" ORDER BY name_of_movie');
  return result.rows;
}