import React, { useState } from 'react';
import Aayam_photo from './icons/AayamRegmi.jpg';
import CV_PREVIEW from './icons/CV_PREVIEW.png';
import BritishCollege from './icons/TBC.jpg'; // Import British College logo
import Trinity from './icons/Trinity.jpg'; // Import Trinity logo
import './About.css';
import cv from './icons/ACV.pdf';
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaEye, 
  FaPython, FaJava, FaJsSquare, FaReact, FaDatabase,
  FaGraduationCap, FaUniversity, FaCalendarAlt
} from 'react-icons/fa';
import { SiDjango, SiSpringboot, SiR } from 'react-icons/si';

function About(){
    const [showView, setShowView] = useState(false);

    return(
        <>
        <div className="aboutme" id="about">
            <div className="photocontainer">
                <div className="photo">
                    <img className="aayamphoto" src={Aayam_photo} alt="Aayam Regmi"/>
                </div>
                <div className="socials2">
                    <a href={cv} target="_blank" rel="noopener noreferrer"><p className='CV'>CV</p></a>
                </div>
            </div>
            <div className="background">
                <h3 className='Hello'>Hello I'm,</h3>
                <h1 className='AayamRegmi2'>Aayam Regmi</h1>
                <div className="socials3">
                <a className="githublink2" href='https://github.com/AayamRegmi' target="_blank" rel="noopener noreferrer">
                    <FaGithub size={30} /> 
                </a>
                <a className="linkedinlink2" href='https://www.linkedin.com/in/aayam-regmi-196193283/' target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={30} />
                </a>
                <a className="maillink2" href='mailto:aayam.regmi2003@gmail.com'>
                    <FaEnvelope size={30} /> 
                </a>
                </div>
                <h3 className='full'>Fullstack | Machine Learning</h3>
                <div className="mainbackground">
                    <p>• Fullstack development and machine learning</p>
                    <p>• Working with IOT devices</p>
                    <p>• Working towards Bachelors in honors Computing at <a href="https://www.thebritishcollege.edu.np/" target="_blank">The British College</a></p>
                    <p>• Skillful in databases</p>
                    <p>• Open to Internships and job offers</p>
                </div>
            </div>
        </div>
        <div className="seperatorline"></div>

        {/* CV and Skills Section - Side by Side Layout */}
        <div className="cv-skills-section" id="cv">
            <div className="cv-skills-container">
                {/* CV Preview on the left */}
                <div 
                    className="cv-container" 
                    onMouseEnter={() => setShowView(true)}
                    onMouseLeave={() => setShowView(false)}
                >
                    <h2>CV</h2>
                    <div className="cv-image-container">
                        <img 
                            src={CV_PREVIEW} 
                            alt="CV Preview" 
                            className="cv-display"
                        />
                        {showView && (
                            <div className="view-overlay">
                                <a href={cv} target="_blank" rel="noopener noreferrer" className="view-button">
                                    <FaEye size={30} />
                                    <span>View CV</span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Skills animation on the right - This will be automatically imported from your Skills component */}
                <div className="skills-preview">
                    <h2>Key Skills</h2>
                    <div className="skills-slider mini">
                        <div className="skills-track">
                            <div className="skill-category-label">Languages</div>
                            <div className="skill-item">
                                <span className="skill-icon python">
                                  <FaPython />
                                </span>
                                <span className="skill-name">Python</span>
                            </div>
                            <div className="skill-item">
                                <span className="skill-icon sql">
                                  <FaDatabase />
                                </span>
                                <span className="skill-name">SQL</span>
                            </div>
                            <div className="skill-item">
                                <span className="skill-icon java">
                                  <FaJava />
                                </span>
                                <span className="skill-name">Java</span>
                            </div>
                            <div className="skill-item">
                                <span className="skill-icon js">
                                  <FaJsSquare />
                                </span>
                                <span className="skill-name">JavaScript</span>
                            </div>
                            <div className="skill-item">
                                <span className="skill-icon r">
                                  <SiR />
                                </span>
                                <span className="skill-name">R</span>
                            </div>

                            <div className="skill-category-label">Frameworks</div>
                            <div className="skill-item">
                                <span className="skill-icon spring">
                                  <SiSpringboot />
                                </span>
                                <span className="skill-name">Spring Boot</span>
                            </div>
                            <div className="skill-item">
                                <span className="skill-icon react">
                                  <FaReact />
                                </span>
                                <span className="skill-name">React</span>
                            </div>
                            <div className="skill-item">
                                <span className="skill-icon django">
                                  <SiDjango />
                                </span>
                                <span className="skill-name">Django</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="seperatorline"></div>
        
        {/* Education Section */}
        <div className="education-section" id="education">
            <h2 className="education-title">
                <FaGraduationCap className="education-icon" />
                Education
            </h2>
            
            <div className="education-timeline">
                {/* Bachelor's Degree */}
                <div className="education-item">
                    <div className="education-logo-container">
                        <img 
                            src={BritishCollege} 
                            alt="The British College Logo" 
                            className="education-logo"
                        />
                    </div>
                    <div className="education-content">
                        <h3 className="education-degree">Bachelor of Science (Hons) in Computing</h3>
                        <h4 className="education-school">The British College</h4>
                        <div className="education-details">
                            <span className="education-duration">
                                <FaCalendarAlt className="education-date-icon" />
                                2021 - Present
                            </span>
                            <span className="education-location">
                                <FaUniversity className="education-location-icon" />
                                Kathmandu, Nepal
                            </span>
                        </div>
                        <p className="education-description">
                            Pursuing a comprehensive education in computing with focus on software 
                            development, algorithms, databases, and artificial intelligence.
                        </p>
                    </div>
                </div>
                
                {/* A-Levels */}
                <div className="education-item">
                    <div className="education-logo-container">
                        <img 
                            src={Trinity} 
                            alt="Trinity International College Logo" 
                            className="education-logo"
                        />
                    </div>
                    <div className="education-content">
                        <h3 className="education-degree">A-Level</h3>
                        <h4 className="education-school">Trinity International College</h4>
                        <div className="education-details">
                            <span className="education-duration">
                                <FaCalendarAlt className="education-date-icon" />
                                2019 - 2021
                            </span>
                            <span className="education-location">
                                <FaUniversity className="education-location-icon" />
                                Kathmandu, Nepal
                            </span>
                        </div>
                        <p className="education-description">
                            Completed A-Level education with focus on Mathematics, Physics, and Computer Science.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className="seperatorline"></div>
        </>
    )
}

export default About;