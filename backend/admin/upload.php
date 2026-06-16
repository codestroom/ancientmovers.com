<?php
require __DIR__ . '/auth.php';
check_csrf();

header('Content-Type: application/json');

if (empty($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
  echo json_encode(['error' => 'No file received.']);
  exit;
}

$file = $_FILES['image'];

if ($file['size'] > 6 * 1024 * 1024) {
  echo json_encode(['error' => 'Image too large (max 6 MB).']);
  exit;
}

// Validate it is a real image and pick a safe extension from the actual MIME type.
$allowed = [
  'image/jpeg' => 'jpg',
  'image/png'  => 'png',
  'image/webp' => 'webp',
  'image/gif'  => 'gif',
];
$mime = mime_content_type($file['tmp_name']);
if (!isset($allowed[$mime])) {
  echo json_encode(['error' => 'Only JPG, PNG, WEBP or GIF allowed.']);
  exit;
}
$ext = $allowed[$mime];

$cfg = am_config();
// upload_dir is relative to public_html; this admin folder lives in public_html/admin
$publicRoot = dirname(__DIR__);               // .../public_html
$relDir     = '/' . trim($cfg['upload_dir'], '/');
$absDir     = $publicRoot . $relDir;

if (!is_dir($absDir) || !is_writable($absDir)) {
  echo json_encode(['error' => "Upload folder $relDir is missing or not writable."]);
  exit;
}

// Build a clean filename from the original name
$base = pathinfo($file['name'], PATHINFO_FILENAME);
$base = strtolower(preg_replace('/[^a-zA-Z0-9-]+/', '-', $base));
$base = trim($base, '-') ?: 'image';
$name = $base . '-' . substr(bin2hex(random_bytes(4)), 0, 6) . '.' . $ext;

if (!move_uploaded_file($file['tmp_name'], $absDir . '/' . $name)) {
  echo json_encode(['error' => 'Could not save the file.']);
  exit;
}

echo json_encode(['path' => $relDir . '/' . $name]);
