<?php
/**
 * Public endpoint: receives website enquiry / quote-request forms.
 *   POST /api/enquiry.php   (JSON or form-encoded body)
 * Stores the submission so it shows up in the admin panel.
 */
require __DIR__ . '/../lib/db.php';

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'Method not allowed']);
  exit;
}

// Accept either JSON or normal form posts.
$raw = file_get_contents('php://input');
$body = [];
if ($raw) {
  $json = json_decode($raw, true);
  if (is_array($json)) $body = $json;
}
if (!$body) $body = $_POST;

$val = fn($k) => isset($body[$k]) ? trim((string)$body[$k]) : '';

// Honeypot: bots fill hidden fields. Pretend success, store nothing.
if ($val('company') !== '') {
  echo json_encode(['ok' => true]);
  exit;
}

$name  = $val('name');
$phone = $val('phone');
$email = $val('email');

// Minimal validation: need at least a name and one way to reach them.
if ($name === '' || ($phone === '' && $email === '')) {
  http_response_code(422);
  echo json_encode(['error' => 'Please provide your name and a phone or email.']);
  exit;
}

$source = $val('source');
if (!in_array($source, ['contact', 'quick-quote'], true)) $source = 'contact';

try {
  $stmt = am_db()->prepare(
    'INSERT INTO enquiries (name, phone, email, move_date, move_from, move_to, home_size, service, message, source)
     VALUES (:name, :phone, :email, :move_date, :move_from, :move_to, :home_size, :service, :message, :source)'
  );
  $stmt->execute([
    'name'      => mb_substr($name, 0, 150),
    'phone'     => mb_substr($phone, 0, 50),
    'email'     => mb_substr($email, 0, 150),
    'move_date' => mb_substr($val('date'), 0, 50),
    'move_from' => mb_substr($val('from'), 0, 200),
    'move_to'   => mb_substr($val('to'), 0, 200),
    'home_size' => mb_substr($val('size'), 0, 100),
    'service'   => mb_substr($val('service'), 0, 100),
    'message'   => mb_substr($val('msg') ?: $val('message'), 0, 4000),
    'source'    => $source,
  ]);
  echo json_encode(['ok' => true]);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Could not save your enquiry. Please call us.']);
}
