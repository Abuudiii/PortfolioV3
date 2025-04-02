import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import CrypticHoverText from '../components/CrypticHoverText';
import { useNavigate } from 'react-router-dom';

// New TerminalInput component
const TerminalInput = ({ projectTitle }) => {
  const [command, setCommand] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (command.trim().toLowerCase() === `cd ${projectTitle}`.toLowerCase()) {
        navigate(`/${projectTitle.toLowerCase()}`);
      } else {
        setError(`Command not recognized. Try "cd ${projectTitle}"`);
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  return (
    <div className="terminal-container w-full max-w-md mx-auto">
      <div className="terminal-prompt bg-green/ backdrop-blur-sm p-3 rounded-md">
        <div className="flex items-center">
          <span className="text-[#00ff00] mr-2 hacker-text text-xs">$</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent text-[#00ff00] outline-none w-full hacker-text text-xs"
            placeholder={`cd ${projectTitle}`}
            spellCheck="false"
          />
        </div>
        {error && (
          <div className="text-red-500 text-xs mt-2 hacker-text">{error}</div>
        )}
      </div>
    </div>
  );
};

const MatrixRain = () => {
  const canvasRef = useRef(null);
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Adjust font size based on screen width
      const newFontSize = Math.max(10, Math.min(20, window.innerWidth / 100));
      setFontSize(newFontSize);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%";
    const columns = canvas.width / fontSize;
    const drops = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    // Drawing function
    const draw = () => {
      // Semi-transparent black background to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green text with increased brightness
      ctx.fillStyle = '#00ff00';
      ctx.font = `${fontSize}px "Press Start 2P"`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top with random delay
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    // Animation loop
    const interval = setInterval(draw, 33); // ~30 FPS

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [fontSize]); // Add fontSize to dependencies

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0"
      style={{ opacity: 0.25 }}
    />
  );
};

// Update the project rendering to use TerminalInput
const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <div className="technologies">
        {project.technologies.map((tech, index) => (
          <span key={index} className="tech-tag">{tech}</span>
        ))}
      </div>
      <TerminalInput projectTitle={project.title} />
    </div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "PortoBeats",
      description: "A music streaming platform built with React and Node.js, featuring real-time audio playback and playlist management.",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "#"
    },
    {
      title: "Project 2",
      description: "A full-stack web application showcasing modern development practices and responsive design.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      link: "#"
    },
    {
      title: "Project 3",
      description: "An innovative solution leveraging Python and Django for efficient data processing and visualization.",
      technologies: ["Python", "Django", "PostgreSQL"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-black relative">
      <MatrixRain />
      {/* Custom font for 8-bit style */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          .hacker-text {
            font-family: 'Press Start 2P', cursive;
            text-shadow: 0 0 10px #00ff00;
            line-height: 1.8;
          }
          .section-title {
            font-size: clamp(1rem, 2vw, 1.5rem);
            line-height: 1.4;
            margin-bottom: 1.5rem;
          }
          .content-text {
            font-size: clamp(0.7rem, 1.5vw, 0.9rem);
            line-height: 1.8;
          }
          .tech-tag {
            font-size: clamp(0.5rem, 1vw, 0.7rem);
            line-height: 1.4;
            padding: 0.25rem 0.5rem;
          }
          .terminal-container {
            margin-top: 1rem;
          }
          .terminal-prompt {
            font-family: 'Courier New', monospace;
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
          }
          .terminal-prompt input::placeholder {
            color: rgba(0, 255, 0, 0.5);
          }
        `}
      </style>

      <div className="container mx-auto max-w-4xl relative z-10 py-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#00ff00] text-center mb-16 hacker-text section-title"
        >
          My Projects
        </motion.h1>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              <h2 className="text-[#00ff00] mb-6 hacker-text section-title">
                {project.title}
              </h2>
              <div className="text-[#00ff00] mb-8 hacker-text content-text max-w-2xl mx-auto">
                {project.title === "PortoBeats" ? (
                  <div className="flex justify-center">
                    <div className="max-w-[600px]">
                      <CrypticHoverText 
                        text={project.description} 
                        className="inline-block cursor-pointer text-center leading-relaxed"
                      />
                    </div>
                  </div>
                ) : (
                  project.description
                )}
              </div>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-[#00ff00] hacker-text tech-tag"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <TerminalInput projectTitle={project.title} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
