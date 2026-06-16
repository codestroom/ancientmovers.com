<?php
/**
 * Session auth guard + CSRF token. Include at the top of every admin page
 * EXCEPT login.php. Redirects to login if not authenticated.
 */
require __DIR__ . '/../lib/db.php';

session_start();

if (empty($_SESSION['am_admin'])) {
  header('Location: login.php');
  exit;
}

// CSRF token (simple, per-session)
if (empty($_SESSION['csrf'])) {
  $_SESSION['csrf'] = bin2hex(random_bytes(16));
}

function csrf_token(): string { return $_SESSION['csrf']; }

function check_csrf(): void {
  $sent = $_POST['csrf'] ?? '';
  if (!hash_equals($_SESSION['csrf'] ?? '', $sent)) {
    http_response_code(403);
    exit('Invalid CSRF token. Go back and try again.');
  }
}

function h(?string $s): string { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
