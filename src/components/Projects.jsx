import React, { useState, useEffect } from 'react';
import './Projects.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const GITHUB_USERNAME = 'AayamRegmi'; 

    useEffect(() => {
        fetchGitHubProjects();
    }, []);

    const fetchGitHubProjects = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const repos = await response.json();
            
            const filteredRepos = repos.filter(repo => !repo.fork && !repo.archived);
            
            // Transform the data with OpenGraph images
            const transformedProjects = filteredRepos.map(repo => ({
                id: repo.id,
                name: repo.name,
                description: repo.description || 'No description available',
                html_url: repo.html_url,
                homepage: repo.homepage,
                language: repo.language,
                // Use GitHub OpenGraph image with a random hash for cache busting
                image: `https://opengraph.githubassets.com/default/${GITHUB_USERNAME}/${repo.name}`
            }));

            setProjects(transformedProjects);
        } catch (err) {
            console.error('Error fetching GitHub projects:', err);
            setError(err.message);
            // Fallback to sample data if API fails
            setProjects(sampleProjects);
        } finally {
            setLoading(false);
        }
    };

    // Generate a random hash for the OpenGraph URL
    const generateRandomHash = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };

    const generateProjectImage = (projectName, language) => {
        const colors = {
            JavaScript: '7289da',
            Python: '4CAF50',
            TypeScript: 'FF9800',
            'Node.js': '2196F3',
            React: '9C27B0',
            HTML: 'E91E63',
            CSS: '00BCD4',
            Java: 'F44336',
            'C++': '673AB7',
            'C#': '3F51B5'
        };
        
        const color = colors[language] || '7289da';
        const encodedName = encodeURIComponent(projectName.replace(/[-_]/g, ' '));
        
        return `https://via.placeholder.com/400x200/${color}/ffffff?text=${encodedName}`;
    };

    // Sample projects as fallback with OpenGraph images
    const sampleProjects = [
        {
            id: 1,
            name: "Portfolio Website",
            description: "A modern portfolio website built with React and Vite, featuring responsive design and smooth animations.",
            html_url: "https://github.com/AayamRegmi/portfolio",
            homepage: "https://aayamregmi.github.io/portfolio",
            language: "JavaScript",
            image: `https://opengraph.githubassets.com/${generateRandomHash()}/AayamRegmi/portfolio`
        },
        {
            id: 2,
            name: "Machine Learning Project",
            description: "A comprehensive machine learning project implementing various algorithms for data analysis and prediction.",
            html_url: "https://github.com/AayamRegmi/ml-project",
            homepage: null,
            language: "Python",
            image: `https://opengraph.githubassets.com/${generateRandomHash()}/AayamRegmi/ml-project`
        },
        {
            id: 3,
            name: "Web Application",
            description: "A full-stack web application with modern UI/UX design and robust backend functionality.",
            html_url: "https://github.com/AayamRegmi/web-app",
            homepage: "https://mywebapp.com",
            language: "TypeScript",
            image: `https://opengraph.githubassets.com/${generateRandomHash()}/AayamRegmi/web-app`
        },
        {
            id: 4,
            name: "Mobile App",
            description: "Cross-platform mobile application built with React Native for both iOS and Android platforms.",
            html_url: "https://github.com/AayamRegmi/mobile-app",
            homepage: null,
            language: "JavaScript",
            image: `https://opengraph.githubassets.com/${generateRandomHash()}/AayamRegmi/mobile-app`
        },
        {
            id: 5,
            name: "API Server",
            description: "RESTful API server with authentication, database integration, and comprehensive documentation.",
            html_url: "https://github.com/AayamRegmi/api-server",
            homepage: null,
            language: "Node.js",
            image: `https://opengraph.githubassets.com/${generateRandomHash()}/AayamRegmi/api-server`
        },
        {
            id: 6,
            name: "Data Visualization",
            description: "Interactive data visualization dashboard using D3.js and modern web technologies.",
            html_url: "https://github.com/AayamRegmi/data-viz",
            homepage: "https://dataviz.example.com",
            language: "JavaScript",
            image: `https://opengraph.githubassets.com/${generateRandomHash()}/AayamRegmi/data-viz`
        }
    ];

    const getLanguageColor = (language) => {
        const colors = {
            JavaScript: '#f7df1e',
            Python: '#3776ab',
            TypeScript: '#3178c6',
            'Node.js': '#339933',
            React: '#61dafb',
            HTML: '#e34f26',
            CSS: '#1572b6',
            Java: '#ED8B00',
            'C++': '#00599C',
            'C#': '#239120'
        };
        return colors[language] || '#7289da';
    };

    if (loading) {
        return (
            <div className="projects-loading">
                <div className="spinner"></div>
                <p>Loading projects from GitHub...</p>
            </div>
        );
    }

    if (error && projects.length === 0) {
        return (
            <div className="projects-error">
                <h3>Error loading projects</h3>
                <p>{error}</p>
                <button onClick={fetchGitHubProjects} className="retry-button">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="projects-section" id="projects">
            <h2 className="projects-title">My Projects</h2>
            <p className="projects-subtitle">Here are some of my recent projects from GitHub</p>
            
            {error && (
                <div className="projects-warning">
                    <p>⚠️ Using sample data due to API error: {error}</p>
                </div>
            )}
            
            <div className="projects-grid">
                {projects.map((project) => (
                    <div key={project.id} className="project-card">
                        <div className="project-image">
                            <img
                              src={project.image}
                              alt={project.name}
                              onError={e => { e.target.onerror = null; e.target.src = generateProjectImage(project.name, project.language); }}
                            />
                            <div className="project-overlay">
                                <div className="project-links">
                                    <a 
                                        href={project.html_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="project-link github-link"
                                        title="View on GitHub"
                                    >
                                        <FaGithub size={20} />
                                    </a>
                                    {project.homepage && (
                                        <a 
                                            href={project.homepage} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="project-link demo-link"
                                            title="Live Demo"
                                        >
                                            <FaExternalLinkAlt size={18} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="project-content">
                            <h3 className="project-name">{project.name}</h3>
                            <p className="project-description">{project.description}</p>
                            
                            <div className="project-stats">
                                <div className="project-language">
                                    {project.language && (
                                        <>
                                            <span 
                                                className="language-dot" 
                                                style={{ backgroundColor: getLanguageColor(project.language) }}
                                            ></span>
                                            {project.language}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Projects;