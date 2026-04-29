-- =================================================================================
-- PATHÉ MANAGEMENT SYSTEM - 002 MEGA DATASET 100% DÉTERMINISTE
-- =================================================================================

-- 0. NETTOYAGE PRÉALABLE
TRUNCATE TABLE "Ticket", "Receipt", "ShowtimeSeatPrice", "Showtime", "Seat", "Theater", "MovieCastCrew", "Movie", "Employee", "Member", "CastAndCrew", "PaymentMethod", "Language", "Position", "MovieType", "SeatType", "Branch" RESTART IDENTITY CASCADE;

-- 1. TABLES DE RÉFÉRENCE (LOGIQUES ET RÉALISTES)
INSERT INTO "Language" (language_id, language_code, language_name) VALUES
(1, 'FR', 'French'), (2, 'EN', 'English'), (3, 'ES', 'Spanish');

INSERT INTO "MovieType" (movie_type_id, movie_type_code, description) VALUES
(1, 'ACT', 'Action'), (2, 'SCI', 'Sci-Fi'), (3, 'DRA', 'Drama'), (4, 'COM', 'Comedy'), (5, 'THR', 'Thriller');

INSERT INTO "SeatType" (seat_type_id, seat_type_code, description) VALUES
(1, 'REG', 'Regular'), (2, 'COM', 'Comfort'), (3, 'PMR', 'Wheelchair'), (4, 'VIP', 'VIP');

INSERT INTO "Position" (position_id, position_code, description) VALUES
(1, 'DIR', 'Director'), (2, 'ACT', 'Actor/Actress'), (3, 'MGR', 'Theater Manager'), (4, 'CSH', 'Cashier');

INSERT INTO "PaymentMethod" (payment_method_id, payment_method_code, description) VALUES
(1, 'CARD', 'Credit Card'), (2, 'CASH', 'Cash'), (3, 'APAY', 'Apple Pay'), (4, 'VOUC', 'Voucher');

-- 2. SUCCURSALES (5) ET SALLES (15)
INSERT INTO "Branch" (branch_id, branch_code, branch_name, location_city) VALUES
(1, 'BR-PAR', 'Pathé Beaugrenelle', 'Paris'), 
(2, 'BR-LYO', 'Pathé Bellecour', 'Lyon'), 
(3, 'BR-MAR', 'Pathé Madeleine', 'Marseille'), 
(4, 'BR-LIL', 'Pathé Lille', 'Lille'), 
(5, 'BR-BOR', 'Pathé Quinconces', 'Bordeaux');

INSERT INTO "Theater" (theater_id, theater_code, branch_id, theater_no) VALUES
(1, 'PA-S1', 1, 1), (2, 'PA-S2', 1, 2), (3, 'PA-S3', 1, 3),
(4, 'LY-S1', 2, 1), (5, 'LY-S2', 2, 2), (6, 'LY-S3', 2, 3),
(7, 'MA-S1', 3, 1), (8, 'MA-S2', 3, 2), (9, 'MA-S3', 3, 3),
(10, 'LI-S1', 4, 1), (11, 'LI-S2', 4, 2), (12, 'LI-S3', 4, 3),
(13, 'BO-S1', 5, 1), (14, 'BO-S2', 5, 2), (15, 'BO-S3', 5, 3);

-- 3. EMPLOYÉS (15) ET MEMBRES (15)
INSERT INTO "Employee" (employee_id, employee_name, branch_id, position_id) VALUES
(1, 'Alice Manager', 1, 3), (2, 'Bob Cashier', 1, 4), (3, 'Charlie Cashier', 1, 4),
(4, 'David Manager', 2, 3), (5, 'Eva Cashier', 2, 4), (6, 'Frank Cashier', 2, 4),
(7, 'Grace Manager', 3, 3), (8, 'Hugo Cashier', 3, 4), (9, 'Ida Cashier', 3, 4),
(10, 'Jean Manager', 4, 3), (11, 'Kim Cashier', 4, 4), (12, 'Leo Cashier', 4, 4),
(13, 'Mia Manager', 5, 3), (14, 'Noah Cashier', 5, 4), (15, 'Olga Cashier', 5, 4);

INSERT INTO "Member" (member_id, member_code, member_name, phone_no, email, discount_percent) VALUES
(1, 'M-01', 'Paul Atreides', '0600000001', 'p@mail.com', 10), (2, 'M-02', 'Luke Skywalker', '0600000002', 'l@mail.com', 0),
(3, 'M-03', 'Bruce Wayne', '0600000003', 'b@mail.com', 5), (4, 'M-04', 'Clark Kent', '0600000004', 'c@mail.com', 0),
(5, 'M-05', 'Diana Prince', '0600000005', 'd@mail.com', 15), (6, 'M-06', 'Tony Stark', '0600000006', 't@mail.com', 0),
(7, 'M-07', 'Peter Parker', '0600000007', 'pp@mail.com', 10), (8, 'M-08', 'Natasha Romanoff', '0600000008', 'n@mail.com', 5),
(9, 'M-09', 'Steve Rogers', '0600000009', 's@mail.com', 0), (10, 'M-10', 'Wanda Maximoff', '0600000010', 'w@mail.com', 20),
(11, 'M-11', 'Arthur Curry', '0600000011', 'a@mail.com', 0), (12, 'M-12', 'Barry Allen', '0600000012', 'ba@mail.com', 5),
(13, 'M-13', 'Hal Jordan', '0600000013', 'h@mail.com', 10), (14, 'M-14', 'John Wick', '0600000014', 'j@mail.com', 0),
(15, 'M-15', 'James Bond', '0600000015', 'jb@mail.com', 10);

-- 4. FILMS (10) ET CASTING
INSERT INTO "Movie" (movie_id, movie_code, name_of_movie, studio, country, runtime, release_date, movie_type_id, rate) VALUES
(1, 'MOV-01', 'Dune: Part Two', 'Warner', 'USA', 166, '2024-02-28', 2, '13+'),
(2, 'MOV-02', 'Oppenheimer', 'Universal', 'USA', 180, '2023-07-19', 3, '13+'),
(3, 'MOV-03', 'The Batman', 'Warner', 'USA', 176, '2022-03-02', 1, '13+'),
(4, 'MOV-04', 'Interstellar', 'Paramount', 'USA', 169, '2014-11-05', 2, 'G'),
(5, 'MOV-05', 'Inception', 'Warner', 'USA', 148, '2010-07-21', 2, '13+'),
(6, 'MOV-06', 'Parasite', 'CJ Ent.', 'Korea', 132, '2019-05-30', 5, '15+'),
(7, 'MOV-07', 'Gladiator II', 'Paramount', 'UK', 150, '2024-11-13', 1, '15+'),
(8, 'MOV-08', 'Barbie', 'Warner', 'USA', 114, '2023-07-19', 4, 'G'),
(9, 'MOV-09', 'Pulp Fiction', 'Miramax', 'USA', 154, '1994-10-14', 5, '18+'),
(10, 'MOV-10', 'Tenet', 'Warner', 'UK', 150, '2020-08-26', 1, '13+');

INSERT INTO "CastAndCrew" (person_id, first_name, last_name, country_of_birth) VALUES
(1, 'Christopher', 'Nolan', 'UK'), (2, 'Denis', 'Villeneuve', 'Canada'),
(3, 'Timothée', 'Chalamet', 'USA'), (4, 'Cillian', 'Murphy', 'Ireland');

INSERT INTO "MovieCastCrew" (id, movie_id, person_id, position_id, name_of_role) VALUES
(1, 1, 2, 1, 'Director'), (2, 1, 3, 2, 'Paul Atreides'), 
(3, 2, 1, 1, 'Director'), (4, 2, 4, 2, 'Oppenheimer'),
(5, 5, 1, 1, 'Director'), (6, 10, 1, 1, 'Director');

-- 5. GÉNÉRATION MASSIVE SANS ALÉATOIRE

-- 5.1 Génération de 450 Sièges
INSERT INTO "Seat" (seat_id, theater_id, row_no, seat_no, seat_type_id)
SELECT 
    ((t.theater_id - 1) * 30) + ((ascii(r.row_no) - 65) * 10) + s.seat_no AS seat_id,
    t.theater_id,
    r.row_no,
    s.seat_no,
    CASE 
        WHEN r.row_no = 'A' AND s.seat_no IN (1, 2) THEN 3 
        WHEN r.row_no = 'B' THEN 4 
        WHEN r.row_no = 'C' THEN 2 
        ELSE 1 
    END AS seat_type_id
FROM "Theater" t
CROSS JOIN (VALUES ('A'), ('B'), ('C')) AS r(row_no)
CROSS JOIN (VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10)) AS s(seat_no);

-- 5.2 Génération de 150 Séances
INSERT INTO "Showtime" (show_id, theater_id, movie_id, show_date, show_time, main_lang_id, audio_lang_id, sub_lang_id)
SELECT 
    ((d.day_offset * 30) + ((t.theater_id - 1) * 2) + session_idx.idx) AS show_id,
    t.theater_id,
    ((t.theater_id + session_idx.idx + d.day_offset) % 10) + 1 AS movie_id,
    ('2026-03-20'::date + d.day_offset) AS show_date,
    CASE WHEN session_idx.idx = 1 THEN '14:00:00'::time ELSE '20:30:00'::time END AS show_time,
    1 AS main_lang_id,
    CASE WHEN ((t.theater_id + session_idx.idx) % 2) = 0 THEN 2 ELSE 1 END AS audio_lang_id,
    CASE WHEN ((t.theater_id + session_idx.idx) % 2) = 0 THEN 1 ELSE NULL END AS sub_lang_id
FROM "Theater" t
CROSS JOIN (VALUES (0), (1), (2), (3), (4)) AS d(day_offset)
CROSS JOIN (VALUES (1), (2)) AS session_idx(idx);

-- 5.3 Génération des Prix (600 lignes)
INSERT INTO "ShowtimeSeatPrice" (id, show_id, seat_type_id, regular_price, discount_percent, current_price)
SELECT 
    ((s.show_id - 1) * 4) + st.seat_type_id AS id,
    s.show_id,
    st.seat_type_id,
    CASE st.seat_type_id WHEN 1 THEN 12.00 WHEN 2 THEN 16.00 WHEN 3 THEN 10.00 ELSE 25.00 END AS regular_price,
    0 AS discount_percent,
    CASE st.seat_type_id WHEN 1 THEN 12.00 WHEN 2 THEN 16.00 WHEN 3 THEN 10.00 ELSE 25.00 END AS current_price
FROM "Showtime" s
CROSS JOIN "SeatType" st;

-- 5.4 Génération de 400 Reçus
INSERT INTO "Receipt" (receipt_id, receipt_no, receipt_date, show_id, member_id, employee_id, payment_method_id, payment_ref, total_paid)
SELECT 
    gs.idx AS receipt_id,
    'REC-' || LPAD(gs.idx::text, 5, '0') AS receipt_no,
    s.show_date,
    s.show_id,
    CASE WHEN (gs.idx % 3) = 0 THEN (gs.idx % 15) + 1 ELSE NULL END AS member_id,
    (gs.idx % 15) + 1 AS employee_id,
    (gs.idx % 4) + 1 AS payment_method_id,
    CASE WHEN (gs.idx % 4) + 1 IN (1, 3) THEN 'TXN-' || (gs.idx * 10) ELSE NULL END AS payment_ref,
    0.00 
FROM (SELECT generate_series(1, 400) AS idx) gs
JOIN "Showtime" s ON s.show_id = ((gs.idx - 1) % 150) + 1; 

-- 5.5 Génération de 800 Billets
INSERT INTO "Ticket" (ticket_id, receipt_id, seat_type_id, seat_id)
SELECT 
    ((r.receipt_id - 1) * 2) + t_idx.idx AS ticket_id,
    r.receipt_id,
    seat.seat_type_id,
    seat.seat_id
FROM "Receipt" r
JOIN "Showtime" s ON r.show_id = s.show_id
CROSS JOIN (VALUES (1), (2)) AS t_idx(idx)
JOIN "Seat" seat ON seat.seat_id = 
    ((s.theater_id - 1) * 30) + 
    (((r.receipt_id - 1) / 150) * 10) + 
    ((s.show_id % 4) * 2) + 
    t_idx.idx;

-- 5.6 Mise à jour magique des totaux des reçus pour la comptabilité
UPDATE "Receipt" r
SET total_paid = (
    SELECT SUM(sp.current_price)
    FROM "Ticket" t
    JOIN "ShowtimeSeatPrice" sp ON r.show_id = sp.show_id AND t.seat_type_id = sp.seat_type_id
    WHERE t.receipt_id = r.receipt_id
);