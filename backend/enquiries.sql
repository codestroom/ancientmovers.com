-- Ancient Movers — enquiries table (website form submissions)
-- Run this ONCE in phpMyAdmin (select your database, SQL tab). Safe to re-run.

CREATE TABLE IF NOT EXISTS enquiries (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(150),
  phone       VARCHAR(50),
  email       VARCHAR(150),
  move_date   VARCHAR(50),
  move_from   VARCHAR(200),
  move_to     VARCHAR(200),
  home_size   VARCHAR(100),
  service     VARCHAR(100),
  message     TEXT,
  source      VARCHAR(40),                 -- 'contact' | 'quick-quote'
  is_read     TINYINT(1) DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
