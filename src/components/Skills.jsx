import React from 'react';
import './Skills.css';
import { 
  FaPython, FaHtml5, FaCss3Alt, FaJsSquare, FaJava, FaPhp, 
  FaReact, FaNode, FaDatabase, FaGithub, FaHome, FaUser, FaCode, FaBriefcase, FaEnvelope
} from 'react-icons/fa';
import { 
  SiDjango, SiSpringboot, SiVite, SiScikitlearn, 
  SiCplusplus, SiTensorflow, SiPostgresql, SiMongodb, SiR
} from 'react-icons/si';

function Skills() {
  return (
    <>
      <div className="skills-section" id="skills">
        <div className="seperatorline"></div>
        <div className="skills-heading">
          <h1>Skills</h1>
          <p className="skills-subtitle">Technologies I've worked with</p>
          <p className="skills-expertise">Mainly skillful in Python, SQL, Java and JavaScript and Machine Learning</p>
        </div>
        
        <div className="skills-container">
          <div className="skills-slider">
            <div className="skills-track">
              {/* Languages */}
              <div className="skill-category-label">Languages</div>
              <div className="skill-item">
                <FaPython className="skill-icon python" />
                <span className="skill-name">Python</span>
              </div>
              <div className="skill-item">
                <SiCplusplus className="skill-icon cpp" />
                <span className="skill-name">C++</span>
              </div>
              <div className="skill-item">
                <SiR className="skill-icon r" />
                <span className="skill-name">R</span>
              </div>
              <div className="skill-item">
                <FaJsSquare className="skill-icon js" />
                <span className="skill-name">JavaScript</span>
              </div>
              <div className="skill-item">
                <FaJava className="skill-icon java" />
                <span className="skill-name">Java</span>
              </div>
              <div className="skill-item">
                <FaHtml5 className="skill-icon html" />
                <span className="skill-name">HTML</span>
              </div>
              <div className="skill-item">
                <FaCss3Alt className="skill-icon css" />
                <span className="skill-name">CSS</span>
              </div>
              <div className="skill-item">
                <FaPhp className="skill-icon php" />
                <span className="skill-name">PHP</span>
              </div>
              
              {/* Frameworks & Libraries */}
              <div className="skill-category-label">Frameworks & Libraries</div>
              <div className="skill-item">
                <SiDjango className="skill-icon django" />
                <span className="skill-name">Django</span>
              </div>
              <div className="skill-item">
                <SiSpringboot className="skill-icon spring" />
                <span className="skill-name">Spring Boot</span>
              </div>
              <div className="skill-item">
                <FaReact className="skill-icon react" />
                <span className="skill-name">React</span>
              </div>
              <div className="skill-item">
                <SiVite className="skill-icon vite" />
                <span className="skill-name">Vite</span>
              </div>
              <div className="skill-item">
                <SiScikitlearn className="skill-icon sklearn" />
                <span className="skill-name">Scikit-learn</span>
              </div>
              <div className="skill-item">
                <SiTensorflow className="skill-icon tensorflow" />
                <span className="skill-name">TensorFlow</span>
              </div>
              <div className="skill-item">
                <FaNode className="skill-icon node" />
                <span className="skill-name">Node.js</span>
              </div>

              {/* Tools & Technologies */}
              <div className="skill-category-label">Tools & Technologies</div>
              <div className="skill-item">
                <FaGithub className="skill-icon github" />
                <span className="skill-name">Git/GitHub</span>
              </div>
              <div className="skill-item">
                <FaDatabase className="skill-icon database" />
                <span className="skill-name">SQL</span>
              </div>
              <div className="skill-item">
                <SiPostgresql className="skill-icon postgresql" />
                <span className="skill-name">PostgreSQL</span>
              </div>
              <div className="skill-item">
                <SiMongodb className="skill-icon mongodb" />
                <span className="skill-name">MongoDB</span>
              </div>

              {/* Duplicate for continuous loop */}
              <div className="skill-category-label">Languages</div>
              <div className="skill-item">
                <FaPython className="skill-icon python" />
                <span className="skill-name">Python</span>
              </div>
              <div className="skill-item">
                <SiCplusplus className="skill-icon cpp" />
                <span className="skill-name">C++</span>
              </div>
              <div className="skill-item">
                <SiR className="skill-icon r" />
                <span className="skill-name">R</span>
              </div>
              <div className="skill-item">
                <FaJsSquare className="skill-icon js" />
                <span className="skill-name">JavaScript</span>
              </div>
              <div className="skill-item">
                <FaJava className="skill-icon java" />
                <span className="skill-name">Java</span>
              </div>
              <div className="skill-item">
                <FaHtml5 className="skill-icon html" />
                <span className="skill-name">HTML</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add the bottom navigation at the end of the Skills component */}
      <div className="bot-nav">
        <div className="bot-nav-container">
          <a href="#home" className="bot-nav-item">
            <FaHome className="bot-nav-icon" />
            <span className="bot-nav-text">Home</span>
          </a>
          <a href="#about" className="bot-nav-item">
            <FaUser className="bot-nav-icon" />
            <span className="bot-nav-text">About</span>
          </a>
          <a href="#skills" className="bot-nav-item active">
            <FaCode className="bot-nav-icon" />
            <span className="bot-nav-text">Skills</span>
          </a>
          <a href="#projects" className="bot-nav-item">
            <FaBriefcase className="bot-nav-icon" />
            <span className="bot-nav-text">Contact</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default Skills;