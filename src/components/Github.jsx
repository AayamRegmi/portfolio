import React, { useState, useEffect } from 'react';
import './Projects.css';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';

const GITHUB_USERNAME = 'AayamRegmi';

const randomHash = () =>
  Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

const LANG_COLORS = {
  JavaScript: '#f7df1e', Python: '#3776ab', TypeScript: '#3178c6',
  'Node.js': '#339933', React: '#61dafb', HTML: '#e34f26', CSS: '#1572b6',
  Java: '#ED8B00', 'C++': '#00599C', 'C#': '#239120', PHP: '#777BB4',
};

const FALLBACK = [
  {
    id: 'f1', name: 'eHudder-sBasket',
    description: 'E-commerce site in PHP with cart, seller/admin panels, PayPal integration and dashboards — Oracle database backend.',
    html_url: 'https://github.com/AayamRegmi/eHudder-sBasket', homepage: null,
    language: 'PHP', stargazers_count: 0, forks_count: 0,
  },
  {
    id: 'f2', name: 'Tree-Barcode-Tracking',
    description: 'GPS + barcode tree tracking for deforestation prevention. Exchange project with Leeds Beckett — Raspberry Pi, Python, Oracle APEX, React.',
    html_url: 'https://github.com/AayamRegmi/Tree-Barcode-Tracking', homepage: null,
    language: 'Python', stargazers_count: 0, forks_count: 0,
  },
  {
    id: 'f3', name: 'Task-Manager-Todo',
    description: 'Todo app with Spring Boot REST API, PostgreSQL and JWT auth, React frontend. Built during my internship.',
    html_url: 'https://github.com/AayamRegmi/Task-Manager-Todo', homepage: null,
    language: 'Java', stargazers_count: 0, forks_count: 0,
  },
];

function RepoCard({ project, featured }) {
  const img = `https://opengraph.githubassets.com/${randomHash()}/${GITHUB_USERNAME}/${project.name}`;
  const color = LANG_COLORS[project.language] || '#7289da';

  return (
    <article className={`proj-card${featured ? ' proj-card--featured' : ''}`}>
      <div className="proj-card__thumb">
        <img
          src={img}
          alt={project.name}
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="proj-card__links">
          <a className="icon-btn" href={project.html_url} target="_blank" rel="noopener noreferrer" title="View on GitHub">
            <FaGithub />
          </a>
          {project.homepage && (
            <a className="icon-btn" href={project.homepage} target="_blank" rel="noopener noreferrer" title="Live demo">
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>
      <div className="proj-card__body">
        <h3 className="proj-card__name">
          {featured && <span className="proj-card__star">★</span>}
          {project.name.replace(/[-_]/g, ' ')}
        </h3>
        <p className="proj-card__desc">{project.description || 'No description available.'}</p>
        <div className="proj-card__meta">
          {project.language && (
            <span className="proj-card__lang">
              <span className="proj-card__dot" style={{ background: color }} />
              {project.language}
            </span>
          )}
          {project.stargazers_count > 0 && (
            <span className="proj-card__stat"><FaStar /> {project.stargazers_count}</span>
          )}
          {project.forks_count > 0 && (
            <span className="proj-card__stat"><FaCodeBranch /> {project.forks_count}</span>
          )}
        </div>
      </div>
    </article>
  );
}

function GithubContent() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=9`
        );
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const repos = await res.json();
        const clean = repos.filter((r) => !r.fork && !r.archived).slice(0, 6);
        if (!alive) return;
        if (clean.length === 0) { setProjects(FALLBACK); setUsingFallback(true); }
        else setProjects(clean);
      } catch {
        if (!alive) return;
        setProjects(FALLBACK);
        setUsingFallback(true);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const [featured, ...rest] = projects;

  return (
    <div className="proj__body">
      <h2 className="proj__title"><FaGithub /> GitHub</h2>
      <p className="proj__sub">
        {usingFallback
          ? 'A few repositories from my account.'
          : 'Freshly pulled from my GitHub — sorted by latest activity.'}
        {' '}
        <a className="proj__profile" href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">
          @{GITHUB_USERNAME}
        </a>
      </p>

      {loading ? (
        <div className="proj__loading">
          <span className="proj__spinner" /> Fetching repos…
        </div>
      ) : (
        <div className="proj-grid">
          {featured && <RepoCard project={featured} featured />}
          {rest.map((p) => (
            <RepoCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default GithubContent;
