<?php
require __DIR__ . '/auth.php';

$cfg   = am_config();
$error = '';
$ok    = '';

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
  check_csrf();
  $current = $_POST['current'] ?? '';
  $new     = $_POST['new'] ?? '';
  $confirm = $_POST['confirm'] ?? '';

  if (!password_verify($current, $cfg['admin_pass_hash'])) {
    $error = 'Current password is incorrect.';
  } elseif (strlen($new) < 8) {
    $error = 'New password must be at least 8 characters.';
  } elseif ($new !== $confirm) {
    $error = 'New password and confirmation do not match.';
  } elseif ($new === $current) {
    $error = 'New password must be different from the current one.';
  } else {
    // Persist the new hash by rewriting the admin_pass_hash line in config.php.
    $hash = password_hash($new, PASSWORD_DEFAULT);
    $path = __DIR__ . '/../config.php';
    $src  = @file_get_contents($path);
    if ($src === false) {
      $error = 'Could not read config.php.';
    } else {
      // Bcrypt hashes never contain a single quote, so embedding is safe.
      $updated = preg_replace_callback(
        "/('admin_pass_hash'\s*=>\s*')[^']*(')/",
        fn($m) => $m[1] . $hash . $m[2],
        $src, 1, $count
      );
      if (!$count) {
        $error = 'Could not find admin_pass_hash in config.php to update.';
      } elseif (@file_put_contents($path, $updated, LOCK_EX) === false) {
        $error = 'Could not write config.php. Make sure the file is writable on the server.';
      } else {
        $ok = 'Password changed. Use your new password next time you log in.';
      }
    }
  }
}
?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Change password — Ancient Movers Admin</title>
<link rel="stylesheet" href="admin.css">
</head>
<body>
<header class="topbar">
  <div class="brand"><span class="brand-mark">AM</span> Ancient Movers</div>
  <nav class="topnav">
    <a href="index.php">Posts</a>
    <a href="enquiries.php">Enquiries</a>
    <a href="password.php" class="active">Password</a>
    <a href="logout.php" class="btn ghost">Log out</a>
  </nav>
</header>
<main class="wrap narrow">
  <a href="index.php" class="back-link">← All posts</a>
  <h1>Change password</h1>
  <p class="muted">Update the password you use to sign in to this admin panel.</p>

  <?php if ($error): ?><div class="alert"><?= h($error) ?></div><?php endif; ?>
  <?php if ($ok): ?><div class="alert ok"><?= h($ok) ?></div><?php endif; ?>

  <form method="post" autocomplete="off">
    <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">

    <label>Current password
      <input name="current" type="password" required autofocus>
    </label>

    <label>New password <span class="muted small">(at least 8 characters)</span>
      <input name="new" type="password" required minlength="8">
    </label>

    <label>Confirm new password
      <input name="confirm" type="password" required minlength="8">
    </label>

    <div class="actions">
      <button type="submit" class="btn primary">Change password</button>
      <a href="index.php" class="btn ghost">Cancel</a>
    </div>
  </form>
</main>
</body>
</html>
