import React from 'react';
import { FaUser, FaFileAlt, FaGraduationCap, FaBriefcase, FaCode } from 'react-icons/fa';
import './BotNav.css';

function BotNav() {
  // Function for smooth scrolling
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    
    if (element) {
      // Get the navbar height to offset scroll position
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      
      const yOffset = -navbarHeight - 20; // Additional 20px buffer
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bot-nav">
      <div className="bot-nav-container">
        <a href="#about" className="bot-nav-item" onClick={(e) => scrollToSection(e, 'about')}>
          <FaUser className="bot-nav-icon" />
          <span className="bot-nav-text">About</span>
        </a>
        <a href="#cv" className="bot-nav-item" onClick={(e) => scrollToSection(e, 'cv')}>
          <FaFileAlt className="bot-nav-icon" />
          <span className="bot-nav-text">CV</span>
        </a>
        <a href="#education" className="bot-nav-item" onClick={(e) => scrollToSection(e, 'education')}>
          <FaGraduationCap className="bot-nav-icon" />
          <span className="bot-nav-text">Education</span>
        </a>
        <a href="#projects" className="bot-nav-item" onClick={(e) => scrollToSection(e, 'projects')}>
          <FaBriefcase className="bot-nav-icon" />
          <span className="bot-nav-text">Projects</span>
        </a>
        <a href="#skills" className="bot-nav-item" onClick={(e) => scrollToSection(e, 'skills')}>
          <FaCode className="bot-nav-icon" />
          <span className="bot-nav-text">Skills</span>
        </a>
      </div>
    </div>
  );
}

export default BotNav;