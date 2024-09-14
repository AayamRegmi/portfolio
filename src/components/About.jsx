import React from 'react';
import Aayam_photo from './icons/AayamRegmi.jpg';
import './About.css'

import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function About(){




    return(
        <>
        <div className="aboutme">
            
            <div className="photocontainer">
            <div className="photo">
                <img className="aayamphoto" src={Aayam_photo}/>
            </div>
            <div className="socials2">
                <a href='' target="_blank" rel="noopener noreferrer"><p className='CV'>CV</p></a>
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
                    <p>• Background in web, software</p>
                    <p>• Working towards Bachelors in honors Computing at <a href="https://www.thebritishcollege.edu.np/">The British College</a></p>
                    <p>• Great interest and currently studying Machine Learning</p>
                    <p>• Open to Internships and job offers
                    </p>
                </div>

            </div>
        </div>
        <div className="seperatorline"></div>
        </>
    )
}
export default About;