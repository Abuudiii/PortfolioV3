import React, { useState, useEffect, useRef } from 'react';
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

const ExitPrinter = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentCommand, setCurrentCommand] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const exitCommands = [
    { name: 'Python', code: 'sys.exit()' },
    { name: 'JavaScript', code: 'process.exit(0);' },
    { name: 'C/C++', code: 'return 0;' },
    { name: 'Java', code: 'System.exit(0);' },
    { name: 'Ruby', code: 'exit!' },
    { name: 'Go', code: 'os.Exit(0)' }
  ];

  useEffect(() => {
    const currentCode = exitCommands[currentCommand].code;
    const typingSpeed = 100; // Adjust speed as needed

    const timeout = setTimeout(() => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentCommand((prev) => (prev + 1) % exitCommands.length);
        } else {
          setDisplayedText(prev => prev.slice(0, -1));
        }
      } else {
        if (displayedText === currentCode) {
          setTimeout(() => setIsDeleting(true), 1000);
        } else {
          setDisplayedText(prev => currentCode.slice(0, prev.length + 1));
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentCommand]);

  return (
    <div className="font-mono text-[#00ff00] hacker-text text-xs">
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .cursor {
            display: inline-block;
            width: 8px;
            height: 15px;
            background-color: #00ff00;
            margin-left: 4px;
            animation: blink 1s infinite;
          }
        `}
      </style>
      <div className="flex items-center justify-center space-x-2">
        <span>$ {displayedText}</span>
        <span className="cursor" />
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="min-h-screen bg-black relative">
      <MatrixRain />
      <div className="container mx-auto max-w-4xl relative z-10 py-20 px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12 text-center"
        >
          {/* Header */}
          <h1 className="text-[#00ff00] hacker-text text-xl mb-8">
            Contact
          </h1>

          {/* LinkedIn */}
          <div className="flex items-center justify-center">
            <p className="text-[#00ff00] hacker-text text-xs">
              Connect with me on{' '}
              <a
                href="https://www.linkedin.com/feed/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 underline hover:no-underline transition-all"
              >
                LinkedIn
              </a>
            </p>
          </div>

          {/* GitHub */}
          <div className="flex items-center justify-center">
            <p className="text-[#00ff00] hacker-text text-xs">
              Check out my projects on{' '}
              <a
                href="https://github.com/Abuudiii"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 underline hover:no-underline transition-all"
              >
                GitHub
              </a>
            </p>
          </div>

          {/* Portfolio Update Message */}
          <div className="flex items-center justify-center mt-12">
            <p className="text-[#00ff00] hacker-text text-xs">
              Keep checking my portfolio for updates on my latest projects
            </p>
          </div>
        </motion.div>
        <div className="mt-8">
          <ExitPrinter />
        </div>
      </div>
    </div>
  );
};

export default Contact;
