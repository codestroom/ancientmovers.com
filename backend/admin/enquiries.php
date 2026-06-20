<?php
require __DIR__ . '/auth.php';
$db = am_db();

// Actions: mark read/unread, delete
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
  check_csrf();
  $id = (int)($_POST['id'] ?? 0);
  $action = $_POST['action'] ?? '';
  if ($id && $action === 'delete') {
    $db->prepare('DELETE FROM enquiries WHERE id = ?')->execute([$id]);
  } elseif ($id && $action === 'toggle') {
    $db->prepare('UPDATE enquiries SET is_read = 1 - is_read WHERE id = ?')->execute([$id]);
  }
  header('Location: enquiries.php' . (isset($_POST['page']) ? '?page=' . (int)$_POST['page'] : ''));
  exit;
}

[$page, $perPage, $offset] = pager_args(10);
$total = (int)$db->query('SELECT COUNT(*) FROM enquiries')->fetchColumn();
$unread = (int)$db->query('SELECT COUNT(*) FROM enquiries WHERE is_read = 0')->fetchColumn();
$totalPages = (int)ceil($total / $perPage);

$stmt = $db->prepare('SELECT * FROM enquiries ORDER BY created_at DESC LIMIT :lim OFFSET :off');
$stmt->bindValue(':lim', $perPage, PDO::PARAM_INT);
$stmt->bindValue(':off', $offset, PDO::PARAM_INT);
$stmt->execute();
$rows = $stmt->fetchAll();
?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Enquiries — Ancient Movers Admin</title>
<link rel="stylesheet" href="admin.css">
</head>
<body>
<header class="topbar">
  <div class="brand"><span class="brand-mark">AM</span> Ancient Movers</div>
  <nav class="topnav">
    <a href="index.php">Posts</a>
    <a href="enquiries.php" class="active">Enquiries<?php if ($unread): ?> <span class="badge"><?= $unread ?></span><?php endif; ?></a>
    <a href="password.php">Password</a>
    <a href="logout.php" class="btn ghost">Log out</a>
  </nav>
</header>
<main class="wrap">
  <div class="page-head">
    <h1>Enquiries <span class="muted">(<?= $total ?> total<?= $unread ? ", $unread new" : '' ?>)</span></h1>
  </div>

  <?php if (!$rows): ?>
    <div class="empty-card">No enquiries yet. Submissions from the website forms will appear here.</div>
  <?php else: ?>
    <div class="cards">
    <?php foreach ($rows as $r): ?>
      <article class="enq <?= $r['is_read'] ? '' : 'enq--new' ?>">
        <div class="enq__top">
          <div>
            <span class="enq__name"><?= h($r['name']) ?></span>
            <?php if (!$r['is_read']): ?><span class="pill pill--new">New</span><?php endif; ?>
            <span class="pill pill--src"><?= h($r['source']) ?></span>
          </div>
          <time class="muted small"><?= h(date('M j, Y · g:i a', strtotime($r['created_at']))) ?></time>
        </div>
        <div class="enq__contact">
          <?php if ($r['phone']): ?><a href="tel:<?= h($r['phone']) ?>">📞 <?= h($r['phone']) ?></a><?php endif; ?>
          <?php if ($r['email']): ?><a href="mailto:<?= h($r['email']) ?>">✉️ <?= h($r['email']) ?></a><?php endif; ?>
        </div>
        <?php if ($r['move_from'] || $r['move_to'] || $r['move_date'] || $r['home_size'] || $r['service']): ?>
        <ul class="enq__meta">
          <?php if ($r['move_from']): ?><li><b>From</b> <?= h($r['move_from']) ?></li><?php endif; ?>
          <?php if ($r['move_to']): ?><li><b>To</b> <?= h($r['move_to']) ?></li><?php endif; ?>
          <?php if ($r['move_date']): ?><li><b>Date</b> <?= h($r['move_date']) ?></li><?php endif; ?>
          <?php if ($r['home_size']): ?><li><b>Size</b> <?= h($r['home_size']) ?></li><?php endif; ?>
          <?php if ($r['service']): ?><li><b>Service</b> <?= h($r['service']) ?></li><?php endif; ?>
        </ul>
        <?php endif; ?>
        <?php if ($r['message']): ?><p class="enq__msg"><?= nl2br(h($r['message'])) ?></p><?php endif; ?>
        <div class="enq__actions">
          <form method="post" class="inline">
            <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
            <input type="hidden" name="id" value="<?= (int)$r['id'] ?>">
            <input type="hidden" name="page" value="<?= $page ?>">
            <button class="btn small" name="action" value="toggle"><?= $r['is_read'] ? 'Mark unread' : 'Mark read' ?></button>
            <button class="btn small danger" name="action" value="delete" onclick="return confirm('Delete this enquiry?');">Delete</button>
          </form>
        </div>
      </article>
    <?php endforeach; ?>
    </div>
    <?= render_pager($page, $totalPages, 'enquiries.php') ?>
  <?php endif; ?>
</main>
</body>
</html>
