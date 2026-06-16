<?php
require __DIR__ . '/auth.php';
$db = am_db();

$id   = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$post = null;
if ($id) {
  $stmt = $db->prepare('SELECT * FROM blogs WHERE id = ?');
  $stmt->execute([$id]);
  $post = $stmt->fetch();
  if (!$post) { header('Location: index.php'); exit; }
}

$content = $post ? (json_decode($post['content'], true) ?: []) : [];
?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= $post ? 'Edit' : 'New' ?> post — Ancient Movers Admin</title>
<link rel="stylesheet" href="admin.css">
</head>
<body>
<header class="topbar">
  <strong>Ancient Movers · Blog</strong>
  <nav><a href="index.php" class="btn ghost">← All posts</a></nav>
</header>
<main class="wrap narrow">
  <h1><?= $post ? 'Edit post' : 'New post' ?></h1>
  <form method="post" action="save.php" id="postForm">
    <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
    <input type="hidden" name="id" value="<?= (int)$id ?>">

    <label>Title
      <input name="title" required value="<?= h($post['title'] ?? '') ?>">
    </label>

    <label>Slug <span class="muted small">(URL: /blog/<i>slug</i> — leave blank to auto-generate)</span>
      <input name="slug" value="<?= h($post['slug'] ?? '') ?>" placeholder="auto from title">
    </label>

    <label>Excerpt <span class="muted small">(short summary, also used as meta description)</span>
      <textarea name="excerpt" rows="2"><?= h($post['excerpt'] ?? '') ?></textarea>
    </label>

    <div class="row">
      <label>Category<input name="category" value="<?= h($post['category'] ?? '') ?>" placeholder="Moving Tips"></label>
      <label>Date<input name="display_date" value="<?= h($post['display_date'] ?? '') ?>" placeholder="June 16, 2026"></label>
      <label>Read time<input name="read_time" value="<?= h($post['read_time'] ?? '') ?>" placeholder="4 min read"></label>
    </div>

    <label>Featured image
      <div class="upload-row">
        <input type="text" name="image" id="imageField" value="<?= h($post['image'] ?? '') ?>" placeholder="/images/example.jpg">
        <input type="file" id="imageFile" accept="image/*">
        <button type="button" class="btn small" id="uploadBtn">Upload</button>
      </div>
      <div id="imagePreviewWrap"><?php if (!empty($post['image'])): ?><img id="imagePreview" src="<?= h($post['image']) ?>" alt=""><?php else: ?><img id="imagePreview" style="display:none" alt=""><?php endif; ?></div>
    </label>

    <div class="row">
      <label>Author name<input name="author_name" value="<?= h($post['author_name'] ?? 'Ancient Movers Team') ?>"></label>
      <label>Author initials<input name="author_initials" value="<?= h($post['author_initials'] ?? 'AM') ?>"></label>
    </div>

    <h2>Content blocks</h2>
    <p class="muted small">Build the article from blocks. Drag is not needed — use ↑ ↓ to reorder.</p>
    <div id="blocks"></div>
    <div class="add-bar">
      <button type="button" class="btn" data-add="p">+ Paragraph</button>
      <button type="button" class="btn" data-add="h2">+ Heading</button>
      <button type="button" class="btn" data-add="ul">+ Bullet list</button>
      <button type="button" class="btn" data-add="cta">+ Call-to-action</button>
    </div>

    <input type="hidden" name="content" id="contentField">
    <div class="actions">
      <button type="submit" class="btn primary">Save post</button>
      <a href="index.php" class="btn ghost">Cancel</a>
    </div>
  </form>
</main>

<script>
const initialBlocks = <?= json_encode($content, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?>;
const blocksEl = document.getElementById('blocks');

function makeBlock(block) {
  const wrap = document.createElement('div');
  wrap.className = 'block';
  wrap.dataset.type = block.type;

  const head = document.createElement('div');
  head.className = 'block-head';
  const label = { p: 'Paragraph', h2: 'Heading', ul: 'Bullet list', cta: 'Call-to-action' }[block.type] || block.type;
  head.innerHTML = `<span class="tag">${label}</span>`;
  const controls = document.createElement('div');
  controls.innerHTML = `<button type="button" class="btn tiny" data-move="up">↑</button>
                        <button type="button" class="btn tiny" data-move="down">↓</button>
                        <button type="button" class="btn tiny danger" data-remove>✕</button>`;
  head.appendChild(controls);
  wrap.appendChild(head);

  const ta = document.createElement('textarea');
  ta.rows = block.type === 'ul' ? 4 : (block.type === 'h2' ? 1 : 3);
  if (block.type === 'ul') {
    ta.placeholder = 'One bullet per line';
    ta.value = (block.items || []).join('\n');
  } else {
    ta.placeholder = block.type === 'cta' ? 'CTA text (a “Get Free Quote” button is added automatically)' : '';
    ta.value = block.text || '';
  }
  wrap.appendChild(ta);

  head.querySelector('[data-remove]').onclick = () => wrap.remove();
  controls.querySelector('[data-move="up"]').onclick = () => { if (wrap.previousElementSibling) blocksEl.insertBefore(wrap, wrap.previousElementSibling); };
  controls.querySelector('[data-move="down"]').onclick = () => { if (wrap.nextElementSibling) blocksEl.insertBefore(wrap.nextElementSibling, wrap); };
  return wrap;
}

(initialBlocks.length ? initialBlocks : [{type:'p',text:''}]).forEach(b => blocksEl.appendChild(makeBlock(b)));

document.querySelectorAll('[data-add]').forEach(btn => {
  btn.onclick = () => blocksEl.appendChild(makeBlock({ type: btn.dataset.add }));
});

document.getElementById('postForm').addEventListener('submit', (e) => {
  const out = [];
  blocksEl.querySelectorAll('.block').forEach(b => {
    const type = b.dataset.type;
    const val = b.querySelector('textarea').value;
    if (type === 'ul') {
      const items = val.split('\n').map(s => s.trim()).filter(Boolean);
      if (items.length) out.push({ type, items });
    } else {
      if (val.trim()) out.push({ type, text: val.trim() });
    }
  });
  document.getElementById('contentField').value = JSON.stringify(out);
});

// Image upload — runs automatically when a file is chosen (button also works).
const uploadBtn = document.getElementById('uploadBtn');
const imageFile = document.getElementById('imageFile');

async function doUpload() {
  const file = imageFile.files[0];
  if (!file) { alert('Choose an image file first.'); return; }
  const fd = new FormData();
  fd.append('csrf', '<?= h(csrf_token()) ?>');
  fd.append('image', file);
  uploadBtn.textContent = 'Uploading…'; uploadBtn.disabled = true;
  try {
    const res = await fetch('upload.php', { method: 'POST', body: fd });
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); }
    catch (e) {
      alert('Upload error — the server did not return JSON. Response was:\n\n' + text.slice(0, 400));
      return;
    }
    if (data.path) {
      document.getElementById('imageField').value = data.path;
      const prev = document.getElementById('imagePreview');
      prev.src = data.path; prev.style.display = 'block';
    } else {
      alert(data.error || 'Upload failed.');
    }
  } catch (err) {
    alert('Upload failed: ' + err.message);
  } finally {
    uploadBtn.textContent = 'Upload'; uploadBtn.disabled = false;
  }
}

uploadBtn.onclick = doUpload;
imageFile.addEventListener('change', doUpload);
</script>
</body>
</html>
