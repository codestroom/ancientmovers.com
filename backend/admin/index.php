<?php
require __DIR__ . '/auth.php';
$db   = am_db();
$rows = $db->query('SELECT id, slug, title, category, display_date, image FROM blogs ORDER BY sort_order ASC, created_at DESC')->fetchAll();
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
  <strong>Ancient Movers · Blog</strong>
  <nav><a href="edit.php" class="btn">+ New post</a> <a href="logout.php" class="btn ghost">Log out</a></nav>
</header>
<main class="wrap">
  <?php if ($flash): ?><div class="alert ok"><?= h($flash) ?></div><?php endif; ?>
  <h1>Posts <span class="muted">(<?= count($rows) ?>)</span></h1>
  <table class="list">
    <thead><tr><th></th><th>Title</th><th>Category</th><th>Date</th><th></th></tr></thead>
    <tbody>
    <?php foreach ($rows as $r): ?>
      <tr>
        <td><?php if ($r['image']): ?><img class="thumb" src="<?= h($r['image']) ?>" alt=""><?php endif; ?></td>
        <td>
          <a href="edit.php?id=<?= (int)$r['id'] ?>"><?= h($r['title']) ?></a>
          <div class="muted small">/blog/<?= h($r['slug']) ?></div>
        </td>
        <td><?= h($r['category']) ?></td>
        <td><?= h($r['display_date']) ?></td>
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
</main>
</body>
</html>
