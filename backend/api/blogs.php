<?php
/**
 * Read-only public API.
 *   GET /api/blogs.php             -> all posts (newest first)
 *   GET /api/blogs.php?slug=xxx    -> single post, or 404
 */
require __DIR__ . '/../lib/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=300');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
  http_response_code(405);
  echo json_encode(['error' => 'Method not allowed']);
  exit;
}

try {
  $db = am_db();
  $slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';

  if ($slug !== '') {
    $stmt = $db->prepare('SELECT * FROM blogs WHERE slug = ? LIMIT 1');
    $stmt->execute([$slug]);
    $row = $stmt->fetch();
    if (!$row) {
      http_response_code(404);
      echo json_encode(['error' => 'Not found']);
      exit;
    }
    echo json_encode(am_row_to_post($row), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
  }

  $rows = $db->query('SELECT * FROM blogs ORDER BY sort_order ASC, created_at DESC')->fetchAll();
  $posts = array_map('am_row_to_post', $rows);
  echo json_encode($posts, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Server error']);
}
