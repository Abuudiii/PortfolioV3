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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
          .input-text {
            font-size: clamp(0.6rem, 1.2vw, 0.8rem);
            line-height: 1.4;
          }
        `}
      </style>

      <div className="container mx-auto max-w-2xl relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-green-500 text-center mb-12 hacker-text section-title"
        >
          Contact Me
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black/80 backdrop-blur-sm rounded-lg shadow-lg p-8 hacker-border"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-green-500 mb-2 hacker-text input-text">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black/80 backdrop-blur-sm border-2 border-green-500 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-400 hacker-text input-text"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-green-500 mb-2 hacker-text input-text">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black/80 backdrop-blur-sm border-2 border-green-500 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-400 hacker-text input-text"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-green-500 mb-2 hacker-text input-text">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full bg-black/80 backdrop-blur-sm border-2 border-green-500 rounded-lg px-4 py-2 text-green-400 focus:outline-none focus:border-green-400 hacker-text input-text"
                required
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-black/80 backdrop-blur-sm text-green-500 py-3 rounded-lg border-2 border-green-500 hover:bg-green-500/10 transition-colors hacker-text input-text"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
