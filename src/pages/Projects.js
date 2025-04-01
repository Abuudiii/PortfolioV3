import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

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

const Projects = () => {
  const projects = [
    {
      title: "Project 1",
      description: "A brief description of the project and its key features.",
      technologies: ["React", "Node.js", "MongoDB"],
      image: "project1.jpg",
      link: "#"
    },
    {
      title: "Project 2",
      description: "A brief description of the project and its key features.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      image: "project2.jpg",
      link: "#"
    },
    {
      title: "Project 3",
      description: "A brief description of the project and its key features.",
      technologies: ["Python", "Django", "PostgreSQL"],
      image: "project3.jpg",
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
          .hacker-border {
            border: 2px solid #00ff00;
            box-shadow: 0 0 10px #00ff00;
          }
          .hacker-bg {
            background-color: rgba(0, 255, 0, 0.1);
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
        `}
      </style>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-green-500 text-center mb-12 hacker-text section-title"
        >
          My Projects
        </motion.h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-black/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hacker-border"
            >
              <div className="h-48 bg-green-900/30"></div>
              <div className="p-6">
                <h2 className="text-green-500 mb-4 hacker-text section-title">{project.title}</h2>
                <p className="text-green-400 mb-4 hacker-text content-text">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-black/80 backdrop-blur-sm text-green-500 px-2 py-1 rounded hacker-border hacker-text tech-tag"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link}
                  className="text-green-500 hover:text-green-400 hacker-text content-text inline-block"
                >
                  Learn more →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
