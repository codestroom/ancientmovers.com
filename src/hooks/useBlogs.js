import { useState, useEffect } from 'react';
import { fetchAllBlogs } from '../data/blogApi.js';

// Loads all blog posts from the API (with a bundled fallback).
export default function useBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchAllBlogs().then(data => {
      if (active) { setBlogs(data); setLoading(false); }
    });
    return () => { active = false; };
  }, []);

  return { blogs, loading };
}
