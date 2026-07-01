import React from 'react';
import './OSWindow.css';
import { FaRegWindowMinimize, FaRegWindowMaximize, FaRegWindowRestore, FaTimes } from 'react-icons/fa';

// which edges each handle drags
const HANDLES = [
  ['n',  { top: true }],
  ['s',  { bottom: true }],
  ['e',  { right: true }],
  ['w',  { left: true }],
  ['ne', { top: true, right: true }],
  ['nw', { top: true, left: true }],
  ['se', { bottom: true, right: true }],
  ['sw', { bottom: true, left: true }],
];

const MIN_W = 320;
const MIN_H = 220;

function OSWindow({
  title, icon, rect, z, focused, isMobile, maxed,
  onFocus, onClose, onMinimize, onToggleMax, onMove, onSetRect, children,
}) {
  const beginDrag = (e) => {
    if (isMobile || maxed || e.button !== 0) return;
    onFocus();
    const sx = e.clientX, sy = e.clientY, ox = rect.x, oy = rect.y;
    const move = (ev) => onMove(ox + ev.clientX - sx, oy + ev.clientY - sy);
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      document.body.classList.remove('is-dragging');
    };
    document.body.classList.add('is-dragging');
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };

  const beginResize = (dir) => (e) => {
    if (isMobile || maxed || e.button !== 0) return;
    e.stopPropagation();
    onFocus();
    const sx = e.clientX, sy = e.clientY;
    const ox = rect.x, oy = rect.y, ow = rect.w, oh = rect.h;
    const spec = HANDLES.find(([d]) => d === dir)[1];

    const move = (ev) => {
      const dx = ev.clientX - sx;
      const dy = ev.clientY - sy;
      let x = ox, y = oy, w = ow, h = oh;

      if (spec.right)  w = Math.max(MIN_W, ow + dx);
      if (spec.bottom) h = Math.max(MIN_H, oh + dy);
      if (spec.left)  { const nw = Math.max(MIN_W, ow - dx); x = ox + (ow - nw); w = nw; }
      if (spec.top)   { const nh = Math.max(MIN_H, oh - dy); y = oy + (oh - nh); h = nh; }

      onSetRect({ x, y, w, h });
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      document.body.classList.remove('is-dragging');
    };
    document.body.classList.add('is-dragging');
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };

  const style = isMobile
    ? { zIndex: z }
    : { left: rect.x, top: rect.y, width: rect.w, height: rect.h, zIndex: z };

  const btn = (e, fn) => { e.stopPropagation(); fn(); };

  return (
    <section
      className={`oswin${focused ? ' oswin--focused' : ''}${isMobile ? ' oswin--mobile' : ''}${maxed ? ' oswin--max' : ''}`}
      style={style}
      onPointerDown={onFocus}
    >
      <div
        className="oswin__bar"
        onPointerDown={beginDrag}
        onDoubleClick={() => !isMobile && onToggleMax()}
      >
        <span className="oswin__title">
          <span className="oswin__title-icon">{icon}</span>
          {title}
        </span>

        <span className="oswin__ctrls" onPointerDown={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="wbtn wbtn--min"
            onClick={(e) => btn(e, onMinimize)}
            aria-label={`Minimize ${title}`}
            title="Minimize"
          >
            <FaRegWindowMinimize />
          </button>
          {!isMobile && (
            <button
              type="button"
              className="wbtn wbtn--max"
              onClick={(e) => btn(e, onToggleMax)}
              aria-label={maxed ? `Restore ${title}` : `Maximize ${title}`}
              title={maxed ? 'Restore' : 'Maximize'}
            >
              {maxed ? <FaRegWindowRestore /> : <FaRegWindowMaximize />}
            </button>
          )}
          <button
            type="button"
            className="wbtn wbtn--close"
            onClick={(e) => btn(e, onClose)}
            aria-label={`Close ${title}`}
            title="Close"
          >
            <FaTimes />
          </button>
        </span>
      </div>

      <div className="oswin__body">{children}</div>

      {!isMobile && !maxed && HANDLES.map(([dir]) => (
        <span
          key={dir}
          className={`oswin__grip oswin__grip--${dir}`}
          onPointerDown={beginResize(dir)}
          aria-hidden="true"
        />
      ))}
    </section>
  );
}

export default OSWindow;
