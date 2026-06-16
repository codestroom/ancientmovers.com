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

/**
 * Returns [page, perPage, offset] from the ?page query param.
 */
function pager_args(int $perPage = 10): array {
  $page = max(1, (int)($_GET['page'] ?? 1));
  return [$page, $perPage, ($page - 1) * $perPage];
}

/**
 * Renders Prev / 1 2 3 / Next pagination. $base is the page URL (e.g. "index.php").
 */
function render_pager(int $page, int $totalPages, string $base): string {
  if ($totalPages <= 1) return '';
  $link = fn($p, $label, $cls = '') =>
    ($p < 1 || $p > $totalPages || $p === $page)
      ? "<span class=\"page $cls disabled\">$label</span>"
      : "<a class=\"page $cls\" href=\"$base?page=$p\">$label</a>";
  $out = '<nav class="pager">';
  $out .= $link($page - 1, '‹ Prev');
  for ($p = 1; $p <= $totalPages; $p++) {
    $out .= ($p === $page)
      ? "<span class=\"page current\">$p</span>"
      : "<a class=\"page\" href=\"$base?page=$p\">$p</a>";
  }
  $out .= $link($page + 1, 'Next ›');
  $out .= '</nav>';
  return $out;
}
