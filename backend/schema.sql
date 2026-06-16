-- Ancient Movers — blog table
-- Run this once in Hostinger phpMyAdmin (select your database first, then SQL tab).

CREATE TABLE IF NOT EXISTS blogs (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  slug            VARCHAR(255) NOT NULL UNIQUE,
  title           VARCHAR(255) NOT NULL,
  excerpt         TEXT,
  category        VARCHAR(100),
  display_date    VARCHAR(50),                 -- shown as-is, e.g. "May 15, 2025"
  read_time       VARCHAR(50),                 -- e.g. "4 min read"
  image           VARCHAR(255),                -- e.g. "/images/piano.webp"
  author_name     VARCHAR(120) DEFAULT 'Ancient Movers Team',
  author_initials VARCHAR(10)  DEFAULT 'AM',
  content         JSON NOT NULL,               -- array of blocks: {type:p|h2|ul|cta, text|items}
  sort_order      INT DEFAULT 0,               -- lower = newer/first; used for ordering
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
