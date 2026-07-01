import React from 'react';
import Aayam_photo from './icons/AayamRegmi.jpg';
import BritishCollege from './icons/TBC.jpg';
import Trinity from './icons/Trinity.jpg';
import './About.css';
import cv from './icons/Aayam_Regmi_CV2026-July.pdf';
import {
  FaGithub, FaLinkedin, FaEnvelope, FaFilePdf, FaDownload,
  FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt
} from 'react-icons/fa';

const HIGHLIGHTS = [
  'Computer vision & robotic perception research',
  'Pose estimation & vision-based human–computer interaction',
  'Lead researcher — piano finger-tracking (paper in prep)',
  'BSc (Hons) Computing @ The British College (Leeds Beckett)',
  'Fullstack (Spring Boot · React) & ML background',
  'Seeking graduate research — open to roles',
];

const EDUCATION = [
  {
    logo: BritishCollege,
    degree: 'BSc (Hons) Computer Science — Database Specialization',
    school: 'Leeds Beckett University — via The British College',
    period: 'Oct 2022 — May 2025',
    location: 'Kathmandu, Nepal',
    desc: 'GPA ~3.9/4.0 (82–91% across semesters), top 5% of cohort, Merit/Refund scholarship candidate, and International Student Exchange Programme selectee (1 of ~200).',
  },
  {
    logo: Trinity,
    degree: 'A-Levels',
    school: 'Trinity International College',
    period: 'Sep 2020 — May 2022',
    location: 'Kathmandu, Nepal',
    desc: 'Science faculty with Computer Science, Mathematics and Physics.',
  },
  {
    logo: null,
    degree: 'Secondary Education Examination (SEE)',
    school: 'Galaxy Public School',
    period: 'Apr 2012 — Apr 2020',
    location: 'Bhaktapur, Nepal',
    desc: 'Schooling through to the national Secondary Education Examination.',
  },
];

/* ---------------- hello.me ---------------- */
export function HelloContent() {
  return (
    <div className="hero">
      <div className="hero__grid">
        <div className="hero__photo-wrap">
          <img className="hero__photo" src={Aayam_photo} alt="Aayam Regmi" />
          <span className="hero__badge">🦔</span>
        </div>

        <div className="hero__content">
          <p className="hero__kicker">Hello, I'm</p>
          <h1 className="hero__name">Aayam Regmi</h1>
          <p className="hero__role">Computer Vision&nbsp;·&nbsp;ML Research</p>

          <ul className="hero__list">
            {HIGHLIGHTS.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          <div className="hero__actions">
            <a className="btn btn--primary" href={cv} target="_blank" rel="noopener noreferrer">
              <FaDownload /> Download CV
            </a>
            <a className="chip" href="https://github.com/AayamRegmi" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
            <a className="chip" href="https://www.linkedin.com/in/aayam-regmi-196193283/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
            <a className="chip" href="mailto:aayam.regmi2003@gmail.com">
              <FaEnvelope /> Email
            </a>
          </div>
        </div>
      </div>

      <div className="hero__edu">
        <h3 className="hero__edu-title"><FaGraduationCap /> Education</h3>
        <div className="hero__edu-list">
          {EDUCATION.map((e) => (
            <div className="hero__edu-item" key={e.school}>
              <div className="hero__edu-logo">
                {e.logo
                  ? <img src={e.logo} alt={`${e.school} logo`} />
                  : <FaGraduationCap className="hero__edu-logo-icon" />}
              </div>
              <div className="hero__edu-text">
                <span className="hero__edu-degree">{e.degree}</span>
                <span className="hero__edu-school">{e.school}</span>
                <span className="hero__edu-meta">
                  <FaCalendarAlt /> {e.period}
                  <span className="hero__edu-dot">·</span>
                  <FaMapMarkerAlt /> {e.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- resume.me ---------------- */
export function ResumeContent() {
  return (
    <div className="cv">
      <div className="cv__bar">
        <div className="cv__bar-info">
          <h3 className="cv__heading"><FaFilePdf /> Latest CV</h3>
          <span className="cv__meta-line">Updated July 2026 · page 1</span>
        </div>
        <div className="cv__actions">
          <a className="btn btn--accent" href={cv} target="_blank" rel="noopener noreferrer">
            <FaFilePdf /> Open full CV
          </a>
          <a className="btn" href={cv} download>
            <FaDownload /> Download
          </a>
        </div>
      </div>

      <div className="cv__preview">
        <object
          data={`${cv}#page=1&view=FitH&toolbar=0&navpanes=0`}
          type="application/pdf"
          className="cv__frame"
          aria-label="CV — first page preview"
        >
          <div className="cv__fallback">
            <FaFilePdf size={46} />
            <p>Preview not available in this browser.</p>
            <a className="btn btn--accent" href={cv} target="_blank" rel="noopener noreferrer">
              <FaFilePdf /> Open CV
            </a>
          </div>
        </object>
      </div>
    </div>
  );
}

/* ---------------- Education.app ---------------- */
export function EducationContent() {
  return (
    <>
      <h2 className="edu__title">
        <FaGraduationCap /> Education
      </h2>
      <div className="edu__timeline">
        {EDUCATION.map((e) => (
          <div className="edu__item" key={e.school}>
            <div className="edu__logo-wrap">
              {e.logo
                ? <img src={e.logo} alt={`${e.school} logo`} className="edu__logo" />
                : <FaGraduationCap className="edu__logo-icon" />}
            </div>
            <div className="edu__content">
              <h3 className="edu__degree">{e.degree}</h3>
              <h4 className="edu__school">{e.school}</h4>
              <div className="edu__details">
                <span><FaCalendarAlt /> {e.period}</span>
                <span><FaMapMarkerAlt /> {e.location}</span>
              </div>
              <p className="edu__desc">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
