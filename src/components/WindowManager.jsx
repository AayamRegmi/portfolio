import React, { createContext, useContext, useReducer, useCallback } from 'react';

// static per-window config (positions are desktop defaults, clamped at runtime)
export const WINDOW_DEFS = {
  hello:     { title: 'hello.me',        label: 'hello.me',  w: 600, h: 700, x: 116, y: 16 },
  resume:    { title: 'resume.me',       label: 'resume.me', w: 650, h: 660, x: 730, y: 14 },
  education: { title: 'Education.app',   label: 'Education', w: 600, h: 360, x: 700, y: 356 },
  skills:    { title: 'Skills.terminal', label: 'Skills',    w: 680, h: 460, x: 240, y: 90  },
  projects:  { title: 'Projects.app',    label: 'Projects',  w: 780, h: 580, x: 220, y: 70  },
  github:    { title: 'GitHub.app',      label: 'GitHub',    w: 760, h: 560, x: 260, y: 90  },
  blog:      { title: 'blog.md',         label: 'Blog',      w: 700, h: 580, x: 280, y: 60  },
};

export const WINDOW_ORDER = ['hello', 'resume', 'education', 'skills', 'projects', 'github', 'blog'];

const MIN_W = 320;
const MIN_H = 220;
// keep the left-hand app icons clear when a window first opens (drag can still cover them)
export const LEFT_GUTTER = 112;

function init() {
  const rects = {};
  for (const id of WINDOW_ORDER) {
    const d = WINDOW_DEFS[id];
    rects[id] = { x: d.x, y: d.y, w: d.w, h: d.h };
  }
  return {
    rects,
    open: { hello: true, resume: true },
    minimized: {},
    maxed: {},
    restore: {}, // saved rect before maximize
    z: { resume: 1, hello: 2 }, // hello focused on top by default
    top: 2,
    bounds: { w: 1200, h: 700 },
  };
}

function clampRect(r, bounds) {
  const { w: bw, h: bh } = bounds;
  let w = Math.max(MIN_W, r.w);
  let h = Math.max(MIN_H, r.h);
  let x = Math.max(0, Math.min(r.x, Math.max(0, bw - MIN_W)));
  let y = Math.max(0, Math.min(r.y, Math.max(0, bh - MIN_H)));
  if (x + w > bw) w = bw - x;
  if (y + h > bh) h = bh - y;
  w = Math.max(MIN_W, w);
  h = Math.max(MIN_H, h);
  return { x, y, w, h };
}

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN': {
      // opening also un-minimizes and brings to front
      const top = state.top + 1;
      const minimized = { ...state.minimized };
      delete minimized[action.id];
      // never open a window on top of the left-hand app icons (user can still drag it there)
      let rects = state.rects;
      const r = state.rects[action.id];
      if (r && !state.maxed[action.id] && r.x < LEFT_GUTTER) {
        const maxX = Math.max(0, state.bounds.w - r.w);
        const x = Math.min(LEFT_GUTTER, maxX);
        rects = { ...state.rects, [action.id]: { ...r, x } };
      }
      return {
        ...state,
        open: { ...state.open, [action.id]: true },
        minimized,
        rects,
        z: { ...state.z, [action.id]: top },
        top,
      };
    }
    case 'CLOSE': {
      const open = { ...state.open };
      const minimized = { ...state.minimized };
      const maxed = { ...state.maxed };
      delete open[action.id];
      delete minimized[action.id];
      delete maxed[action.id];
      return { ...state, open, minimized, maxed };
    }
    case 'MINIMIZE': {
      return { ...state, minimized: { ...state.minimized, [action.id]: true } };
    }
    case 'FOCUS': {
      if (!state.open[action.id] || state.minimized[action.id]) return state;
      const top = state.top + 1;
      return { ...state, z: { ...state.z, [action.id]: top }, top };
    }
    case 'TOGGLE_MAX': {
      const top = state.top + 1;
      const z = { ...state.z, [action.id]: top };
      if (state.maxed[action.id]) {
        // restore
        const maxed = { ...state.maxed };
        delete maxed[action.id];
        const prev = state.restore[action.id] || state.rects[action.id];
        return {
          ...state, z, top, maxed,
          rects: { ...state.rects, [action.id]: clampRect(prev, state.bounds) },
        };
      }
      // maximize: remember current rect, fill bounds
      return {
        ...state, z, top,
        maxed: { ...state.maxed, [action.id]: true },
        restore: { ...state.restore, [action.id]: state.rects[action.id] },
        rects: { ...state.rects, [action.id]: { x: 0, y: 0, w: state.bounds.w, h: state.bounds.h } },
      };
    }
    case 'MOVE': {
      if (state.maxed[action.id]) return state;
      const r = state.rects[action.id];
      const { w: bw, h: bh } = state.bounds;
      const x = Math.max(0, Math.min(action.x, Math.max(0, bw - r.w)));
      const y = Math.max(0, Math.min(action.y, Math.max(0, bh - r.h)));
      return { ...state, rects: { ...state.rects, [action.id]: { ...r, x, y } } };
    }
    case 'SET_RECT': {
      if (state.maxed[action.id]) return state;
      return {
        ...state,
        rects: { ...state.rects, [action.id]: clampRect(action.rect, state.bounds) },
      };
    }
    case 'SET_BOUNDS': {
      const { w: bw, h: bh } = action.bounds;
      const rects = {};
      for (const id in state.rects) {
        if (state.maxed[id]) {
          rects[id] = { x: 0, y: 0, w: bw, h: bh }; // keep maximized filling
          continue;
        }
        const r = state.rects[id];
        const w = Math.min(r.w, bw);
        const h = Math.min(r.h, bh);
        const x = Math.max(0, Math.min(r.x, bw - w));
        const y = Math.max(0, Math.min(r.y, bh - h));
        rects[id] = { x, y, w, h };
      }
      return { ...state, bounds: action.bounds, rects };
    }
    default:
      return state;
  }
}

const Ctx = createContext(null);

export function WindowProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  const api = {
    state,
    open: useCallback((id) => dispatch({ type: 'OPEN', id }), []),
    close: useCallback((id) => dispatch({ type: 'CLOSE', id }), []),
    minimize: useCallback((id) => dispatch({ type: 'MINIMIZE', id }), []),
    toggleMax: useCallback((id) => dispatch({ type: 'TOGGLE_MAX', id }), []),
    focus: useCallback((id) => dispatch({ type: 'FOCUS', id }), []),
    move: useCallback((id, x, y) => dispatch({ type: 'MOVE', id, x, y }), []),
    setRect: useCallback((id, rect) => dispatch({ type: 'SET_RECT', id, rect }), []),
    setBounds: useCallback((bounds) => dispatch({ type: 'SET_BOUNDS', bounds }), []),
  };

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useWindows() {
  return useContext(Ctx);
}
