import React from 'react';
import './Skills.css';
import {
  FaPython, FaHtml5, FaCss3Alt, FaJsSquare, FaJava, FaPhp,
  FaReact, FaNode, FaDatabase, FaGithub
} from 'react-icons/fa';
import {
  SiDjango, SiSpringboot, SiVite, SiScikitlearn,
  SiCplusplus, SiTensorflow, SiPostgresql, SiMongodb, SiR
} from 'react-icons/si';

const GROUPS = [
  {
    label: 'Languages',
    items: [
      { name: 'Python', icon: <FaPython />, cls: 'python' },
      { name: 'C++', icon: <SiCplusplus />, cls: 'cpp' },
      { name: 'R', icon: <SiR />, cls: 'r' },
      { name: 'JavaScript', icon: <FaJsSquare />, cls: 'js' },
      { name: 'Java', icon: <FaJava />, cls: 'java' },
      { name: 'HTML', icon: <FaHtml5 />, cls: 'html' },
      { name: 'CSS', icon: <FaCss3Alt />, cls: 'css' },
      { name: 'PHP', icon: <FaPhp />, cls: 'php' },
    ],
  },
  {
    label: 'Frameworks & Libraries',
    items: [
      { name: 'Django', icon: <SiDjango />, cls: 'django' },
      { name: 'Spring Boot', icon: <SiSpringboot />, cls: 'spring' },
      { name: 'React', icon: <FaReact />, cls: 'react' },
      { name: 'Vite', icon: <SiVite />, cls: 'vite' },
      { name: 'Scikit-learn', icon: <SiScikitlearn />, cls: 'sklearn' },
      { name: 'TensorFlow', icon: <SiTensorflow />, cls: 'tensorflow' },
      { name: 'Node.js', icon: <FaNode />, cls: 'node' },
    ],
  },
  {
    label: 'Tools & Data',
    items: [
      { name: 'Git / GitHub', icon: <FaGithub />, cls: 'github' },
      { name: 'SQL', icon: <FaDatabase />, cls: 'database' },
      { name: 'PostgreSQL', icon: <SiPostgresql />, cls: 'postgresql' },
      { name: 'MongoDB', icon: <SiMongodb />, cls: 'mongodb' },
    ],
  },
];

function SkillsContent() {
  const total = GROUPS.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="skills__body">
      <div className="skills__promptline">
        <span className="skills__prompt">aayam@os</span>
        <span className="skills__path">~/skills</span>
        <span className="skills__cmd">$ ls --grouped</span>
      </div>
      <p className="skills__sub">
        {total} technologies across languages, frameworks &amp; data — mainly
        Python, SQL, Java, JavaScript &amp; Machine Learning.
      </p>

      <div className="skills__groups">
        {GROUPS.map((group) => (
          <section className="skill-group" key={group.label}>
            <h3 className="skill-group__label">
              {group.label}
              <span className="skill-group__count">{group.items.length}</span>
            </h3>
            <div className="skill-grid">
              {group.items.map((item) => (
                <div className="skill-tile" key={item.name}>
                  <span className={`skill-tile__icon ${item.cls}`}>{item.icon}</span>
                  <span className="skill-tile__name">{item.name}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default SkillsContent;
