import React, { useState } from 'react';
import './Blog.css';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaTag, FaRss } from 'react-icons/fa';

/*
 * Blog posts. Replace / add entries here — each post supports simple content
 * blocks so you can paste text without touching the layout code:
 *   { type: 'p',    text: '…' }          paragraph
 *   { type: 'h',    text: '…' }          sub-heading
 *   { type: 'quote',text: '…' }          pull-quote
 *   { type: 'code', text: '…' }          monospace block
 *   { type: 'ul',   items: ['…','…'] }   bullet list
 */
const POSTS = [
  {
    id: 'hello-world',
    title: 'Rebuilding my portfolio as a tiny operating system',
    date: '2026-06-28',
    readMins: 4,
    tags: ['react', 'design'],
    excerpt:
      'Why I ditched the long scrolling page for draggable windows, a dock and a menu bar — and what I learned wiring up a mini window manager in React.',
    body: [
      { type: 'p', text: 'I wanted my site to feel less like a brochure and more like a place you poke around in. So I turned it into a little desktop: every section is a window you can drag, resize and close.' },
      { type: 'h', text: 'The window manager' },
      { type: 'p', text: 'A single reducer holds every window’s rectangle, z-order and open state. Focus just bumps a counter; dragging clamps to the desktop bounds. It is surprisingly little code for how alive it feels.' },
      { type: 'quote', text: 'Constraints are the fun part — one viewport, no page scroll, everything lives in windows.' },
      { type: 'p', text: 'This is a placeholder post. Send me the real content and I’ll drop it straight in here.' },
    ],
  },
  {
    id: 'coming-soon',
    title: 'More posts coming soon',
    date: '2026-07-01',
    readMins: 1,
    tags: ['notes'],
    excerpt: 'Placeholder — I’ll be writing about machine learning experiments, IoT builds and things I break along the way.',
    body: [
      { type: 'p', text: 'This slot is reserved. Give me the topic and text and it will show up here with a proper date and read time.' },
    ],
  },
];

function fmtDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function Block({ block }) {
  switch (block.type) {
    case 'h':
      return <h3 className="post__h">{block.text}</h3>;
    case 'quote':
      return <blockquote className="post__quote">{block.text}</blockquote>;
    case 'code':
      return <pre className="post__code"><code>{block.text}</code></pre>;
    case 'ul':
      return (
        <ul className="post__ul">
          {block.items.map((it, i) => <li key={i}>{it}</li>)}
        </ul>
      );
    case 'p':
    default:
      return <p className="post__p">{block.text}</p>;
  }
}

function BlogContent() {
  const [activeId, setActiveId] = useState(null);
  const active = POSTS.find((p) => p.id === activeId);

  if (active) {
    return (
      <article className="blog blog--reading">
        <button type="button" className="blog__back" onClick={() => setActiveId(null)}>
          <FaArrowLeft /> All posts
        </button>

        <header className="post__head">
          <div className="post__tags">
            {active.tags.map((t) => (
              <span className="post__tag" key={t}><FaTag /> {t}</span>
            ))}
          </div>
          <h1 className="post__title">{active.title}</h1>
          <div className="post__meta">
            <span><FaCalendarAlt /> {fmtDate(active.date)}</span>
            <span><FaClock /> {active.readMins} min read</span>
          </div>
        </header>

        <div className="post__body">
          {active.body.map((b, i) => <Block key={i} block={b} />)}
        </div>

        <footer className="post__foot">
          <button type="button" className="blog__back" onClick={() => setActiveId(null)}>
            <FaArrowLeft /> Back to all posts
          </button>
        </footer>
      </article>
    );
  }

  return (
    <div className="blog">
      <div className="blog__head">
        <h2 className="blog__title"><FaRss /> Blog</h2>
        <p className="blog__sub">Notes on what I’m building and learning.</p>
      </div>

      <ul className="blog__list">
        {POSTS.map((p) => (
          <li key={p.id}>
            <button type="button" className="blog-card" onClick={() => setActiveId(p.id)}>
              <div className="blog-card__meta">
                <span><FaCalendarAlt /> {fmtDate(p.date)}</span>
                <span><FaClock /> {p.readMins} min</span>
              </div>
              <h3 className="blog-card__title">{p.title}</h3>
              <p className="blog-card__excerpt">{p.excerpt}</p>
              <div className="blog-card__tags">
                {p.tags.map((t) => <span className="post__tag" key={t}>#{t}</span>)}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogContent;
