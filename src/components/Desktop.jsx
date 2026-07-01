import React, { useEffect, useRef, useState } from 'react';
import './Desktop.css';
import OSWindow from './OSWindow';
import { useWindows, WINDOW_DEFS, WINDOW_ORDER } from './WindowManager';
import { FaUser, FaFilePdf, FaGraduationCap, FaCode, FaLayerGroup, FaGithub, FaPenNib } from 'react-icons/fa';
import { HelloContent, ResumeContent, EducationContent } from './About';
import SkillsContent from './Skills';
import ProjectsContent from './Projects';
import GithubContent from './Github';
import BlogContent from './Blog';

const ICONS = {
  hello: <FaUser />,
  resume: <FaFilePdf />,
  education: <FaGraduationCap />,
  skills: <FaCode />,
  projects: <FaLayerGroup />,
  github: <FaGithub />,
  blog: <FaPenNib />,
};

const CONTENT = {
  hello: HelloContent,
  resume: ResumeContent,
  education: EducationContent,
  skills: SkillsContent,
  projects: ProjectsContent,
  github: GithubContent,
  blog: BlogContent,
};

function Desktop() {
  const { state, open, close, minimize, toggleMax, focus, move, setRect, setBounds } = useWindows();
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 820 : false
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const mobile = window.innerWidth < 820;
      // reserve room for the floating dock so windows never hide behind it
      const dockReserve = mobile ? 0 : 104;
      setBounds({ w: r.width, h: Math.max(240, r.height - dockReserve) });
      setIsMobile(mobile);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [setBounds]);

  const openIds = WINDOW_ORDER.filter((id) => state.open[id] && !state.minimized[id]);
  const topId = openIds.length
    ? openIds.reduce((a, b) => ((state.z[a] || 0) >= (state.z[b] || 0) ? a : b))
    : null;
  const visibleIds = isMobile && topId ? [topId] : openIds;

  return (
    <div className="desktop" ref={ref}>
      <div className="desktop__icons">
        {WINDOW_ORDER.map((id) => (
          <button
            key={id}
            type="button"
            className={`desk-icon${state.open[id] ? ' desk-icon--open' : ''}`}
            onClick={() => open(id)}
            aria-label={`Open ${WINDOW_DEFS[id].label}`}
          >
            <span className="desk-icon__glyph">{ICONS[id]}</span>
            <span className="desk-icon__label">{WINDOW_DEFS[id].label}</span>
          </button>
        ))}
      </div>

      {visibleIds.map((id) => {
        const Content = CONTENT[id];
        const rect = isMobile
          ? { x: 0, y: 0, w: state.bounds.w, h: state.bounds.h }
          : state.rects[id];
        return (
          <OSWindow
            key={id}
            title={WINDOW_DEFS[id].title}
            icon={ICONS[id]}
            rect={rect}
            z={state.z[id] || 1}
            focused={id === topId}
            isMobile={isMobile}
            maxed={!!state.maxed[id]}
            onFocus={() => focus(id)}
            onClose={() => close(id)}
            onMinimize={() => minimize(id)}
            onToggleMax={() => toggleMax(id)}
            onMove={(x, y) => move(id, x, y)}
            onSetRect={(r) => setRect(id, r)}
          >
            <Content />
          </OSWindow>
        );
      })}
    </div>
  );
}

export default Desktop;
