<?php
/**
 * Copy this file to "config.php" on the server and fill in your values.
 * config.php is git-ignored and should NEVER be committed.
 */

return [
  // ---- Hostinger MySQL (hPanel -> Databases -> MySQL Databases) ----
  'db_host' => 'localhost',
  'db_name' => 'CHANGE_ME_database_name',
  'db_user' => 'CHANGE_ME_database_user',
  'db_pass' => 'CHANGE_ME_database_password',

  // ---- Admin panel login ----
  // Pick a username, then generate the password hash once by running this in
  // Hostinger (or any PHP): echo password_hash('your-password', PASSWORD_DEFAULT);
  // Paste the resulting string below. Do NOT store the plain password here.
  'admin_user'      => 'admin',
  'admin_pass_hash' => 'CHANGE_ME_paste_password_hash_here',

  // Folder where uploaded blog images are written (relative to public_html).
  // Must already exist and be writable. Matches the React app's image paths.
  'upload_dir' => '/images',
];
