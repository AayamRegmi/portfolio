import React from 'react';
import './Projects.css';
import { FaGithub, FaExternalLinkAlt, FaLayerGroup } from 'react-icons/fa';
import piano1 from './icons/PianoFingerTracking1.jpg';
import piano2 from './icons/PianoFingerTracking2.png';
import tree1 from './icons/TreeTrackingHardware1.webp';
import tree2 from './icons/TreeTrackingHardware2.webp';

/*
 * Curated case studies — the story behind the work, not just the repo.
 * Fill each entry in with the real details of what you did.
 *   tag      short category shown top-left
 *   role     your role on the project
 *   period   when
 *   stack    technologies (chips)
 *   points   bullet list of what you actually did / built / learned
 *   links    { github, live } (either optional)
 */
const WORK = [
  {
    id: 'piano-tracking',
    title: 'Vision-Based Finger Tracking for Piano Interaction',
    tag: 'Research · Computer Vision',
    tagline: 'Benchmarking pose-estimation models for real-time piano key-press detection.',
    role: 'Lead Researcher — The British College / Leeds Beckett',
    period: '2024 — 2025',
    stack: ['Python', 'MediaPipe', 'OpenPose', 'OpenCV', 'MPJPE'],
    images: [piano1, piano2],
    points: [
      'Benchmarked MediaPipe vs OpenPose (Convolutional Pose Machines) for real-time key-press detection via pose estimation and geometric containment.',
      'Built a custom MIDI–video synchronisation pipeline and collected a dataset of 38 sessions / 4,777 annotated note-on events with skin-type, hand-size and illuminance metadata.',
      'Proposed a horizontal-axis MPJPE metric for lateral fingertip precision; achieved 63.3% polygon hit rate (MediaPipe) vs 8.1% (OpenPose).',
      'Identified a left–right hand detection asymmetry (95.8% vs 53.2%). Manuscript in preparation for conference submission.',
    ],
    links: {},
  },
  {
    id: 'tree-conservation',
    title: 'Tree Conservation Monitoring System',
    tag: 'IoT · 1st Place 🏆',
    tagline: 'Handheld GPS + barcode device that gives every tree an offline field record.',
    role: 'International Student Exchange Programme — Winning Team',
    period: '2024',
    stack: ['Arduino (C++)', 'NEO-6M GPS', 'UART / I2C / SPI', 'MicroSD', 'OLED'],
    images: [tree1, tree2],
    points: [
      'Designed and assembled a battery-powered IoT device around an Arduino Mega ADK: NEO-6M GPS, UART 2D barcode scanner, SSD1306 OLED, MicroSD reader and a 4-key input board across UART, I2C and SPI buses.',
      'Captures GPS coordinates, timestamps and per-tree field metrics; logs to MicroSD for offline resilience and syncs to a central database for persistent history.',
      'Deployed physical barcodes on trees — scanning one instantly retrieves that tree’s full record on the OLED, with no network required at scan time.',
      'Won 1st place among the International Student Exchange Programme project competition.',
    ],
    links: { github: 'https://github.com/AayamRegmi/Tree-Barcode-Tracking' },
  },
  {
    id: 'credit-default',
    title: 'Credit Card Default Prediction',
    tag: 'Machine Learning',
    tagline: 'Classification models predicting credit-card default on the UCI dataset.',
    role: 'Machine Learning project',
    period: '2023',
    stack: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    points: [
      'Built and compared Random Forest, Logistic Regression, SVM and Gradient Boosting — reaching 92% accuracy with Random Forest.',
      'Applied feature engineering and SMOTE oversampling to handle class imbalance.',
      'Used cross-validated hyperparameter tuning to select and evaluate the final model.',
    ],
    links: {},
  },
  {
    id: 'fullstack-intern',
    title: 'Full-Stack Software Developer (Internship)',
    tag: 'Fullstack · Work',
    tagline: 'Production backend + frontend work at Professional Computer Systems.',
    role: 'Intern — Professional Computer Systems, Kathmandu',
    period: 'Nov 2024 — Mar 2025',
    stack: ['Spring Boot', 'Spring Security', 'PostgreSQL', 'React', 'REST'],
    points: [
      'Developed RESTful backend services and authentication flows with Spring Boot and Spring Security over a PostgreSQL database.',
      'Built responsive frontend components in ReactJS.',
      'Collaborated on the production deployment pipeline within an existing team codebase.',
    ],
    links: { github: 'https://github.com/AayamRegmi/Task-Manager-Todo' },
  },
  {
    id: 'ehudder',
    title: 'eHudder sBasket',
    tag: 'E-commerce',
    tagline: 'Full e-commerce platform with buyer, seller and admin roles.',
    role: 'Solo build',
    period: 'University project',
    stack: ['PHP', 'Oracle DB', 'PayPal API'],
    points: [
      'Built cart, checkout and PayPal payment integration from scratch.',
      'Separate seller and admin panels with sales dashboards.',
      'Backed by an Oracle database with role-based access.',
    ],
    links: { github: 'https://github.com/AayamRegmi/eHudder-sBasket' },
  },
];

function WorkCard({ item }) {
  return (
    <article className="work-card">
      <div className="work-card__top">
        <span className="work-card__tag">{item.tag}</span>
        <div className="work-card__links">
          {item.links?.github && (
            <a className="icon-btn" href={item.links.github} target="_blank" rel="noopener noreferrer" title="Source">
              <FaGithub />
            </a>
          )}
          {item.links?.live && (
            <a className="icon-btn" href={item.links.live} target="_blank" rel="noopener noreferrer" title="Live">
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>

      <h3 className="work-card__title">{item.title}</h3>
      <p className="work-card__tagline">{item.tagline}</p>

      {item.images?.length > 0 && (
        <div className={`work-card__media work-card__media--${item.images.length}`}>
          {item.images.map((src, i) => (
            <a
              key={i}
              className="work-card__shot"
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              title="Open image"
            >
              <img src={src} alt={`${item.title} — screenshot ${i + 1}`} loading="lazy" />
            </a>
          ))}
        </div>
      )}

      <div className="work-card__facts">
        <span><strong>Role</strong> {item.role}</span>
        <span><strong>When</strong> {item.period}</span>
      </div>

      <ul className="work-card__points">
        {item.points.map((p, i) => <li key={i}>{p}</li>)}
      </ul>

      <div className="work-card__stack">
        {item.stack.map((s) => <span className="work-chip" key={s}>{s}</span>)}
      </div>
    </article>
  );
}

function ProjectsContent() {
  return (
    <div className="work">
      <div className="work__head">
        <h2 className="work__title"><FaLayerGroup /> Projects</h2>
        <p className="work__sub">Selected work, with the story behind it.</p>
      </div>
      <div className="work__list">
        {WORK.map((item) => <WorkCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}

export default ProjectsContent;
