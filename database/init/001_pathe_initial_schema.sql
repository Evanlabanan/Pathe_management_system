-- =================================================================================
-- PATHÉ MANAGEMENT SYSTEM - 001 SCHEMA (INCREMENTAL MIGRATION)
-- =================================================================================

-- 1. Création du type ENUM de manière sécurisée (ne plante pas s'il existe déjà)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'MovieRate') THEN
        CREATE TYPE "MovieRate" AS ENUM ('G', '13+', '15+', '18+', '20+');
    END IF;
END
$$;

-- =================================================================================
-- 2. TABLES DE RÉFÉRENCE (PARENTS)
-- =================================================================================

CREATE TABLE IF NOT EXISTS "Branch" (
  "branch_id" int PRIMARY KEY,
  "branch_code" varchar UNIQUE,
  "branch_name" varchar NOT NULL,
  "location_city" varchar
);

CREATE TABLE IF NOT EXISTS "SeatType" (
  "seat_type_id" int PRIMARY KEY,
  "seat_type_code" varchar UNIQUE,
  "description" varchar
);

CREATE TABLE IF NOT EXISTS "MovieType" (
  "movie_type_id" int PRIMARY KEY,
  "movie_type_code" varchar UNIQUE,
  "description" varchar
);

CREATE TABLE IF NOT EXISTS "Position" (
  "position_id" int PRIMARY KEY,
  "position_code" varchar UNIQUE,
  "description" varchar
);

CREATE TABLE IF NOT EXISTS "CastAndCrew" (
  "person_id" int PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "country_of_birth" varchar
);

CREATE TABLE IF NOT EXISTS "Language" (
  "language_id" int PRIMARY KEY,
  "language_code" varchar UNIQUE,
  "language_name" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "Member" (
  "member_id" int PRIMARY KEY,
  "member_code" varchar UNIQUE,
  "member_name" varchar NOT NULL,
  "phone_no" varchar,
  "email" varchar,
  "discount_percent" decimal
);

CREATE TABLE IF NOT EXISTS "PaymentMethod" (
  "payment_method_id" int PRIMARY KEY,
  "payment_method_code" varchar UNIQUE,
  "description" varchar
);

-- =================================================================================
-- 3. TABLES TRANSACTIONNELLES (ENFANTS)
-- =================================================================================

CREATE TABLE IF NOT EXISTS "Employee" (
  "employee_id" int PRIMARY KEY,
  "employee_name" varchar NOT NULL,
  "branch_id" int NOT NULL REFERENCES "Branch" ("branch_id"),
  "position_id" int NOT NULL REFERENCES "Position" ("position_id")
);

CREATE TABLE IF NOT EXISTS "Movie" (
  "movie_id" int PRIMARY KEY,
  "movie_code" varchar UNIQUE,
  "name_of_movie" varchar NOT NULL,
  "studio" varchar,
  "country" varchar,
  "runtime" int,
  "release_date" date,
  "movie_type_id" int NOT NULL REFERENCES "MovieType" ("movie_type_id"),
  "rate" "MovieRate" NOT NULL
);

CREATE TABLE IF NOT EXISTS "MovieCastCrew" (
  "id" int PRIMARY KEY,
  "movie_id" int NOT NULL REFERENCES "Movie" ("movie_id") ON DELETE CASCADE,
  "person_id" int NOT NULL REFERENCES "CastAndCrew" ("person_id"),
  "position_id" int NOT NULL REFERENCES "Position" ("position_id"),
  "name_of_role" varchar
);

CREATE TABLE IF NOT EXISTS "Theater" (
  "theater_id" int PRIMARY KEY,
  "theater_code" varchar UNIQUE,
  "branch_id" int NOT NULL REFERENCES "Branch" ("branch_id"),
  "theater_no" int NOT NULL
);

CREATE TABLE IF NOT EXISTS "Seat" (
  "seat_id" int PRIMARY KEY,
  "theater_id" int NOT NULL REFERENCES "Theater" ("theater_id") ON DELETE CASCADE,
  "row_no" varchar NOT NULL,
  "seat_no" int NOT NULL,
  "seat_type_id" int NOT NULL REFERENCES "SeatType" ("seat_type_id")
);

CREATE TABLE IF NOT EXISTS "Showtime" (
  "show_id" int PRIMARY KEY,
  "theater_id" int NOT NULL REFERENCES "Theater" ("theater_id"),
  "movie_id" int NOT NULL REFERENCES "Movie" ("movie_id"),
  "show_date" date NOT NULL,
  "show_time" time NOT NULL,
  "main_lang_id" int NOT NULL REFERENCES "Language" ("language_id"),
  "audio_lang_id" int NOT NULL REFERENCES "Language" ("language_id"),
  "sub_lang_id" int REFERENCES "Language" ("language_id")
);

CREATE TABLE IF NOT EXISTS "ShowtimeSeatPrice" (
  "id" int PRIMARY KEY,
  "show_id" int NOT NULL REFERENCES "Showtime" ("show_id") ON DELETE CASCADE,
  "seat_type_id" int NOT NULL REFERENCES "SeatType" ("seat_type_id"),
  "regular_price" decimal NOT NULL,
  "discount_percent" decimal,
  "current_price" decimal
);

CREATE TABLE IF NOT EXISTS "Receipt" (
  "receipt_id" int PRIMARY KEY,
  "receipt_no" varchar UNIQUE,
  "receipt_date" date NOT NULL,
  "show_id" int NOT NULL REFERENCES "Showtime" ("show_id"),
  "member_id" int REFERENCES "Member" ("member_id"),
  "employee_id" int NOT NULL REFERENCES "Employee" ("employee_id"),
  "payment_method_id" int NOT NULL REFERENCES "PaymentMethod" ("payment_method_id"),
  "payment_ref" varchar,
  "total_paid" decimal NOT NULL
);

CREATE TABLE IF NOT EXISTS "Ticket" (
  "ticket_id" int PRIMARY KEY,
  "receipt_id" int NOT NULL REFERENCES "Receipt" ("receipt_id") ON DELETE CASCADE,
  "seat_type_id" int NOT NULL REFERENCES "SeatType" ("seat_type_id"),
  "seat_id" int REFERENCES "Seat" ("seat_id")
);