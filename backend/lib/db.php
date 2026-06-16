<?php
/**
 * Shared helpers: config loading + PDO connection.
 */

function am_config(): array {
  static $cfg = null;
  if ($cfg === null) {
    $path = __DIR__ . '/../config.php';
    if (!file_exists($path)) {
      http_response_code(500);
      exit('Missing config.php — copy config.sample.php to config.php and fill it in.');
    }
    $cfg = require $path;
  }
  return $cfg;
}

function am_db(): PDO {
  static $pdo = null;
  if ($pdo === null) {
    $c = am_config();
    $dsn = "mysql:host={$c['db_host']};dbname={$c['db_name']};charset=utf8mb4";
    try {
      $pdo = new PDO($dsn, $c['db_user'], $c['db_pass'], [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
      ]);
    } catch (PDOException $e) {
      http_response_code(500);
      exit('Database connection failed. Check config.php credentials.');
    }
  }
  return $pdo;
}

/**
 * Turn a DB row into the exact shape the React app expects.
 */
function am_row_to_post(array $r): array {
  return [
    'slug'     => $r['slug'],
    'title'    => $r['title'],
    'excerpt'  => $r['excerpt'],
    'category' => $r['category'],
    'date'     => $r['display_date'],
    'readTime' => $r['read_time'],
    'image'    => $r['image'],
    'author'   => [
      'name'     => $r['author_name'],
      'initials' => $r['author_initials'],
    ],
    'content'  => json_decode($r['content'] ?? '[]', true) ?: [],
  ];
}
