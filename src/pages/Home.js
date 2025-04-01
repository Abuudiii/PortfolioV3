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

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const CrypticText = ({ text, className, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%";

  useEffect(() => {
    let currentIndex = 0;
    let randomChars = Array(text.length).fill().map(() => 
      chars[Math.floor(Math.random() * chars.length)]
    );
    let attempts = 0;
    const maxAttempts = 1; // Single random attempt for faster effect

    const interval = setInterval(() => {
      if (attempts < maxAttempts) {
        // Generate new random characters while keeping spaces
        randomChars = randomChars.map((char, i) => 
          text[i] === ' ' ? ' ' : (Math.random() > 0.9 ? chars[Math.floor(Math.random() * chars.length)] : char)
        );
        setDisplayedText(randomChars.join(''));
        attempts++;
      } else if (currentIndex < text.length) {
        // Start replacing random chars with actual text one by one
        randomChars[currentIndex] = text[currentIndex];
        setDisplayedText(randomChars.join(''));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, 30); // Much faster speed for quicker decryption

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayedText}
      {!isTypingComplete && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

const Home = () => {
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
          .hero-text {
            font-size: clamp(1.5rem, 4vw, 3rem);
            line-height: 1.4;
          }
          .hero-description {
            font-size: clamp(0.8rem, 2vw, 1.2rem);
            line-height: 1.6;
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
          .skill-text {
            font-size: clamp(0.6rem, 1.2vw, 0.8rem);
            line-height: 1.6;
            padding: 0.5rem;
          }
          .code-printer {
            margin: 0 auto 2rem;
            position: relative;
            color: #00ff00;
            font-family: 'Press Start 2P', cursive;
            font-size: 14px;
            text-align: center;
            text-shadow: 0 0 10px #00ff00;
          }
          .code-line {
            display: inline-block;
            position: relative;
            padding-left: 20px;
          }
          .code-line::before {
            content: '>';
            position: absolute;
            left: 0;
            color: #00ff00;
          }
          .cursor {
            display: inline-block;
            width: 8px;
            height: 16px;
            background: #00ff00;
            margin-left: 4px;
            animation: blink 1s infinite;
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="h-screen flex items-center justify-center text-center px-4 relative z-10"
      >
        <div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="code-printer"
          >
            <div className="code-line">
              <CodePrinter />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-bold text-[#00ff00] mb-6 hacker-text hero-text"
          >
            <CrypticText text="Welcome to My Portfolio" className="inline-block" />
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[#00ff00] max-w-2xl mx-auto hacker-text hero-description"
          >
            <CrypticText 
              text="I am a Computer Science student passionate about software development. Here you can find my latest projects and get to know me better." 
              className="inline-block"
            />
          </motion.p>
        </div>
      </motion.section>

      {/* About Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-[#00ff00] hacker-text section-title mb-8">
              <CrypticText text="About Me" className="inline-block" />
            </h2>
            <p className="text-[#00ff00] hacker-text content-text max-w-2xl mx-auto">
              <CrypticText 
                text="I love creating elegant solutions to complex problems. My journey in software development has equipped me with skills in various technologies and frameworks." 
                className="inline-block"
              />
            </p>
          </motion.div>

          {/* Skills Section */}
          <section className="py-20 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-[#00ff00] text-center mb-12 hacker-text section-title"
            >
              <CrypticText text="Skills" className="inline-block" />
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-6"
            >
              {['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'Docker'].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="hacker-text text-xs text-[#00ff00] hover:text-[#00ff00]/80 transition-colors duration-300"
                >
                  <CrypticText text={skill} className="inline-block" delay={index * 0.1} />
                </motion.span>
              ))}
            </motion.div>
          </section>
        </div>
      </section>
    </div>
  );
};

const CodePrinter = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(0);

  const languages = [
    { name: 'Python', code: 'print("Hello, World!")' },
    { name: 'JavaScript', code: 'console.log("Hello, World!");' },
    { name: 'Java', code: 'System.out.println("Hello, World!");' },
    { name: 'C++', code: 'std::cout << "Hello, World!" << std::endl;' },
    { name: 'Ruby', code: 'puts "Hello, World!"' },
    { name: 'PHP', code: 'echo "Hello, World!";' },
    { name: 'Go', code: 'fmt.Println("Hello, World!")' },
    { name: 'Rust', code: 'println!("Hello, World!");' }
  ];

  useEffect(() => {
    const currentCode = languages[currentLanguage].code;
    const typingSpeed = 50; // Speed between each character

    const timeout = setTimeout(() => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentLanguage((prev) => (prev + 1) % languages.length);
          setCurrentIndex(0);
        } else {
          setDisplayedText(currentCode.slice(0, displayedText.length - 1));
        }
      } else {
        if (displayedText === currentCode) {
          setTimeout(() => setIsDeleting(true), 2000);
        } else {
          setDisplayedText(currentCode.slice(0, currentIndex + 1));
          setCurrentIndex((prev) => prev + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentIndex, currentLanguage]);

  return (
    <>
      {displayedText}
      <span className="cursor"></span>
    </>
  );
};

export default Home;
