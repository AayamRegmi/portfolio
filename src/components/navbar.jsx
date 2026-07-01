import React, { useEffect, useRef, useState } from 'react';
import './navbar.css';
import logo from '/logo.svg';
import {
  FaGithub, FaLinkedin, FaBatteryThreeQuarters, FaWifi, FaMicrochip, FaPowerOff,
  FaThLarge, FaUser, FaFilePdf, FaGraduationCap, FaCode, FaLayerGroup, FaPenNib,
  FaChevronDown,
} from 'react-icons/fa';
import { useWindows } from './WindowManager';

const NAV = [
  { id: 'hello', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'blog', label: 'Blog' },
  { id: 'resume', label: 'CV' },
];

// full launcher list for the "Apps" start menu
const APPS = [
  { id: 'hello', label: 'About Me', desc: 'Who I am', icon: <FaUser /> },
  { id: 'resume', label: 'CV', desc: 'My résumé', icon: <FaFilePdf /> },
  { id: 'education', label: 'Education', desc: 'Degrees & schools', icon: <FaGraduationCap /> },
  { id: 'skills', label: 'Skills', desc: 'Tech I use', icon: <FaCode /> },
  { id: 'projects', label: 'Projects', desc: 'What I built', icon: <FaLayerGroup /> },
  { id: 'github', label: 'GitHub', desc: 'Live repos', icon: <FaGithub /> },
  { id: 'blog', label: 'Blog', desc: 'Notes & writing', icon: <FaPenNib /> },
];

function Navbar() {
  const { open, state } = useWindows();
  const [clock, setClock] = useState('');
  const [cpu, setCpu] = useState(20);
  const [menuOpen, setMenuOpen] = useState(false);
  const startRef = useRef(null);

  // how many apps are currently running (open windows)
  const openCount = Object.keys(state.open).length;

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    tick();
    const id = setInterval(tick, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  // close the Apps menu on outside click or Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => { if (startRef.current && !startRef.current.contains(e.target)) setMenuOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  // "CPU" load tracks the number of open apps, with a little live jitter
  useEffect(() => {
    const base = Math.min(96, 8 + openCount * 15);
    const jitter = () =>
      setCpu(Math.max(4, Math.min(99, base + Math.round(Math.random() * 8 - 4))));
    jitter(); // update immediately when an app opens/closes
    const id = setInterval(jitter, 2200);
    return () => clearInterval(id);
  }, [openCount]);

  return (
    <header className="menubar">
      <div className="menubar__inner os-wrap">
        <button type="button" className="menubar__brand" onClick={() => open('hello')}>
          <img src={logo} alt="Aayam Regmi logo" className="menubar__logo" />
          <span className="menubar__name">
            Aayam<span className="menubar__name-alt">OS</span>
          </span>
        </button>

        <div className="menubar__start-wrap" ref={startRef}>
          <button
            type="button"
            className={`menubar__start${menuOpen ? ' menubar__start--open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
          >
            <FaThLarge /> Apps <FaChevronDown className="menubar__start-caret" />
          </button>

          {menuOpen && (
            <div className="menubar__menu" role="menu">
              <p className="menubar__menu-title">Open an app</p>
              {APPS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  role="menuitem"
                  className={`menubar__menu-item${state.open[a.id] ? ' is-open' : ''}`}
                  onClick={() => { open(a.id); setMenuOpen(false); }}
                >
                  <span className="menubar__menu-icon">{a.icon}</span>
                  <span className="menubar__menu-text">
                    <span className="menubar__menu-label">{a.label}</span>
                    <span className="menubar__menu-desc">{a.desc}</span>
                  </span>
                  {state.open[a.id] && <span className="menubar__menu-dot" aria-label="open" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <nav className="menubar__nav">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className="menubar__link"
              onClick={() => open(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="menubar__status">
          <a
            className="menubar__icon"
            href="https://github.com/AayamRegmi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            className="menubar__icon"
            href="https://www.linkedin.com/in/aayam-regmi-196193283/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <span className="menubar__sep" />
          <span className="menubar__cpu" title={`CPU ${cpu}%`}>
            <FaMicrochip className="menubar__sys" />
            <span className="menubar__cpu-bar">
              <span className="menubar__cpu-fill" style={{ width: `${cpu}%` }} />
            </span>
            <span className="menubar__cpu-val">{cpu}%</span>
          </span>
          <FaWifi className="menubar__sys" />
          <FaBatteryThreeQuarters className="menubar__sys" />
          <span className="menubar__clock">{clock}</span>
          <button
            type="button"
            className="menubar__power"
            onClick={() => { window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; }}
            aria-label="Shut down"
            title="Shut down"
          >
            <FaPowerOff />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
