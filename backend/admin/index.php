<?php
require __DIR__ . '/auth.php';
$db = am_db();

[$page, $perPage, $offset] = pager_args(10);
$total = (int)$db->query('SELECT COUNT(*) FROM blogs')->fetchColumn();
$totalPages = (int)ceil($total / $perPage);
// Enquiries table may not exist yet — don't let it break the posts page.
try { $unread = (int)$db->query('SELECT COUNT(*) FROM enquiries WHERE is_read = 0')->fetchColumn(); }
catch (Throwable $e) { $unread = 0; }

$stmt = $db->prepare('SELECT id, slug, title, category, display_date, image FROM blogs ORDER BY sort_order ASC, created_at DESC LIMIT :lim OFFSET :off');
$stmt->bindValue(':lim', $perPage, PDO::PARAM_INT);
$stmt->bindValue(':off', $offset, PDO::PARAM_INT);
$stmt->execute();
$rows = $stmt->fetchAll();
$flash = $_GET['msg'] ?? '';
?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Blog posts — Ancient Movers Admin</title>
<link rel="stylesheet" href="admin.css">
</head>
<body>
<header class="topbar">
  <div class="brand"><span class="brand-mark">AM</span> Ancient Movers</div>
  <nav class="topnav">
    <a href="index.php" class="active">Posts</a>
    <a href="enquiries.php">Enquiries<?php if ($unread): ?> <span class="badge"><?= $unread ?></span><?php endif; ?></a>
    <a href="logout.php" class="btn ghost">Log out</a>
  </nav>
</header>
<main class="wrap">
  <?php if ($flash): ?><div class="alert ok"><?= h($flash) ?></div><?php endif; ?>
  <div class="page-head">
    <h1>Blog posts <span class="muted">(<?= $total ?>)</span></h1>
    <a href="edit.php" class="btn primary">+ New post</a>
  </div>
  <table class="list">
    <thead><tr><th></th><th>Title</th><th>Category</th><th>Date</th><th></th></tr></thead>
    <tbody>
    <?php foreach ($rows as $r): ?>
      <tr>
        <td><?php if ($r['image']): ?><img class="thumb" src="<?= h($r['image']) ?>" alt=""><?php endif; ?></td>
        <td>
          <a class="list__title" href="edit.php?id=<?= (int)$r['id'] ?>"><?= h($r['title']) ?></a>
          <div class="muted small">/blog/<?= h($r['slug']) ?></div>
        </td>
        <td><span class="pill pill--src"><?= h($r['category']) ?></span></td>
        <td class="muted small"><?= h($r['display_date']) ?></td>
        <td class="right">
          <a class="btn small" href="edit.php?id=<?= (int)$r['id'] ?>">Edit</a>
          <form method="post" action="delete.php" class="inline" onsubmit="return confirm('Delete this post?');">
            <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
            <input type="hidden" name="id" value="<?= (int)$r['id'] ?>">
            <button class="btn small danger" type="submit">Delete</button>
          </form>
        </td>
      </tr>
    <?php endforeach; ?>
    <?php if (!$rows): ?><tr><td colspan="5" class="muted">No posts yet. Click “New post”.</td></tr><?php endif; ?>
    </tbody>
  </table>
  <?= render_pager($page, $totalPages, 'index.php') ?>
</main>
</body>
</html>
