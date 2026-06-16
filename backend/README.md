# Ancient Movers — Blog backend (core PHP)

A minimal PHP backend that lets you publish blog posts from an admin panel.
The React site reads posts from a read-only JSON API.

```
public_html/                 <- your Hostinger web root
├── index.html, assets/, …   <- the React build (contents of dist/)
├── images/                  <- blog images live here (uploads land here too)
├── api/
│   └── blogs.php            <- public read-only JSON API
├── admin/                   <- password-protected admin panel
├── lib/db.php
└── config.php               <- YOUR credentials (created on server, never committed)
```

## One-time setup on Hostinger

### 1. Create the database
hPanel → **Databases → MySQL Databases**. Create a database + user, and note the
**database name**, **user**, **password**, and **host** (usually `localhost`).

### 2. Create the tables
hPanel → **phpMyAdmin** → select your database → **SQL** tab.
Paste & run `schema.sql`, then paste & run `seed.sql` (loads your 6 existing posts).

### 3. Upload the backend files
Using **File Manager** or FTP, copy into `public_html/`:
- `api/`  → `public_html/api/`
- `admin/` → `public_html/admin/`
- `lib/`  → `public_html/lib/`
- `config.sample.php` → upload, then **rename to `config.php`**

### 4. Fill in config.php
Edit `public_html/config.php`:
- Set `db_name`, `db_user`, `db_pass` from step 1.
- Set `admin_user` to whatever username you want.
- Generate a password hash: create a temp file `hash.php` in `public_html` with
  `<?php echo password_hash('YOUR-PASSWORD', PASSWORD_DEFAULT);` — open it in the
  browser, copy the output into `admin_pass_hash`, then **delete hash.php**.

### 5. Deploy the React build
Run `npm run build` locally and upload everything from `dist/` into `public_html/`
(this includes `.htaccess`, which makes `/blog/...` routes work and lets the PHP
files run). The `images/` folder must be present and writable for uploads.

## Using it
- Admin panel: **https://ancientmovers.com/admin/**
- API (for reference): **https://ancientmovers.com/api/blogs.php**

Add / edit / delete posts in the admin panel. Changes are live immediately — no
rebuild needed (the React app fetches posts at runtime).

## Publishing future content changes to the React app
You only rebuild/redeploy the React app when you change the **site code**. Blog
posts are data in the database, so publishing a post needs no rebuild.

## Notes
- `config.php` is git-ignored on purpose. Keep it only on the server.
- Image uploads are saved to `/images` with a randomized filename.
- To regenerate `seed.sql` from the old hardcoded posts: `node scripts/generate-seed.mjs`.
