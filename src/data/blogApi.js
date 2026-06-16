import { BLOGS as FALLBACK_BLOGS } from './siteData.js';

// In production the React app and the PHP API share the same domain, so a
// relative path works. During local `vite dev` there is no PHP server, so the
// fetch fails and we fall back to the bundled posts.
const API_URL = '/api/blogs.php';

let cache = null;

export async function fetchAllBlogs() {
  if (cache) return cache;
  try {
    const res = await fetch(API_URL, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) && data.length) {
      cache = data;
      return data;
    }
    return FALLBACK_BLOGS;
  } catch {
    // API unavailable (e.g. local dev) — use bundled posts.
    return FALLBACK_BLOGS;
  }
}
