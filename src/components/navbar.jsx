import React, { lazy } from 'react';
import './navbar.css'

import Github from './icons/github.png'
import Linkedin from './icons/linkedin.png'

function Navbar(){


    return(

        <>  
        <div className="navigation">
            <div className="AayamRegmi"><a href='https://aayamregmi.com.np'><p>Aayam <span className="Regmi">Regmi</span></p></a></div>
            <div className="socials">
            <a className="githublink" href='https://github.com/AayamRegmi' target="_blank" rel="noopener noreferrer"><img className="github" src={Github} /> </a>
            <a className="linkedinlink" href='https://www.linkedin.com/in/aayam-regmi-196193283/' target="_blank" rel="noopener noreferrer"><img className="linkedin" src={Linkedin} /></a>
        </div>
        </div>
        
        
        
        
        
        </>
    )
}
export default Navbar;