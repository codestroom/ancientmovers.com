<?php
require __DIR__ . '/auth.php';
check_csrf();

$id = (int)($_POST['id'] ?? 0);
if ($id) {
  $stmt = am_db()->prepare('DELETE FROM blogs WHERE id = ?');
  $stmt->execute([$id]);
}
header('Location: index.php?msg=' . urlencode('Post deleted.'));
