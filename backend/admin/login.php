<?php
require __DIR__ . '/../lib/db.php';
session_start();

$error = '';
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
  $cfg  = am_config();
  $user = $_POST['user'] ?? '';
  $pass = $_POST['pass'] ?? '';
  if (hash_equals($cfg['admin_user'], $user) && password_verify($pass, $cfg['admin_pass_hash'])) {
    session_regenerate_id(true);
    $_SESSION['am_admin'] = true;
    header('Location: index.php');
    exit;
  }
  $error = 'Wrong username or password.';
  usleep(400000); // small delay to slow brute force
}
?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Admin Login — Ancient Movers</title>
<link rel="stylesheet" href="admin.css">
</head>
<body class="login-body">
  <div class="login-aside" aria-hidden="true">
    <div class="login-aside__inner">
      <span class="brand-mark brand-mark--lg">AM</span>
      <h2>Ancient Movers</h2>
      <p>Metro Detroit&rsquo;s most trusted movers. Manage your blog &amp; enquiries here.</p>
    </div>
  </div>
  <form class="login-card" method="post" autocomplete="off">
    <span class="brand-mark">AM</span>
    <h1>Welcome back</h1>
    <p class="muted">Sign in to the admin panel</p>
    <?php if ($error): ?><div class="alert"><?= htmlspecialchars($error) ?></div><?php endif; ?>
    <label>Username<input name="user" required autofocus placeholder="admin"></label>
    <label>Password<input name="pass" type="password" required placeholder="••••••••"></label>
    <button type="submit" class="btn primary btn-block">Log in</button>
  </form>
</body>
</html>
