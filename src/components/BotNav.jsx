import React from 'react';
import { FaUser, FaCode, FaLayerGroup, FaGithub, FaPenNib, FaFilePdf, FaGraduationCap } from 'react-icons/fa';
import './BotNav.css';
import { useWindows } from './WindowManager';

const ITEMS = [
  { id: 'hello', label: 'About', icon: <FaUser /> },
  { id: 'resume', label: 'CV', icon: <FaFilePdf /> },
  { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
  { id: 'skills', label: 'Skills', icon: <FaCode /> },
  { id: 'projects', label: 'Projects', icon: <FaLayerGroup /> },
  { id: 'github', label: 'GitHub', icon: <FaGithub /> },
  { id: 'blog', label: 'Blog', icon: <FaPenNib /> },
];

function BotNav() {
  const { state, open } = useWindows();

  return (
    <nav className="dock" aria-label="Open apps">
      <div className="dock__inner">
        {ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`dock__item${state.open[item.id] ? ' dock__item--open' : ''}`}
            onClick={() => open(item.id)}
            aria-label={item.label}
            aria-pressed={!!state.open[item.id]}
          >
            <span className="dock__icon">{item.icon}</span>
            <span className="dock__tip">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default BotNav;
