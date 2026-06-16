<?php
require __DIR__ . '/auth.php';
check_csrf();

$db = am_db();

function slugify(string $s): string {
  $s = strtolower(trim($s));
  $s = preg_replace('/[^a-z0-9]+/', '-', $s);
  return trim($s, '-');
}

$id      = (int)($_POST['id'] ?? 0);
$title   = trim($_POST['title'] ?? '');
$slug    = trim($_POST['slug'] ?? '');
if ($slug === '') $slug = slugify($title);
else              $slug = slugify($slug);

if ($title === '' || $slug === '') {
  exit('Title is required.');
}

// Validate content JSON came through from the editor
$content = $_POST['content'] ?? '[]';
$decoded = json_decode($content, true);
if (!is_array($decoded)) $decoded = [];
$content = json_encode($decoded, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

$fields = [
  'slug'            => $slug,
  'title'           => $title,
  'excerpt'         => trim($_POST['excerpt'] ?? ''),
  'category'        => trim($_POST['category'] ?? ''),
  'display_date'    => trim($_POST['display_date'] ?? ''),
  'read_time'       => trim($_POST['read_time'] ?? ''),
  'image'           => trim($_POST['image'] ?? ''),
  'author_name'     => trim($_POST['author_name'] ?? 'Ancient Movers Team'),
  'author_initials' => trim($_POST['author_initials'] ?? 'AM'),
  'content'         => $content,
];

try {
  if ($id) {
    $set = implode(', ', array_map(fn($k) => "$k = :$k", array_keys($fields)));
    $stmt = $db->prepare("UPDATE blogs SET $set WHERE id = :id");
    $stmt->execute($fields + ['id' => $id]);
  } else {
    $cols = implode(', ', array_keys($fields));
    $ph   = implode(', ', array_map(fn($k) => ":$k", array_keys($fields)));
    $stmt = $db->prepare("INSERT INTO blogs ($cols) VALUES ($ph)");
    $stmt->execute($fields);
  }
} catch (PDOException $e) {
  if ($e->getCode() === '23000') exit('That slug is already used by another post. Pick a different one.');
  http_response_code(500);
  exit('Could not save post.');
}

header('Location: index.php?msg=' . urlencode('Post saved.'));
