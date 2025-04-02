import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-green/80 backdrop-blur-sm border-t-2 border-[#00ff00]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          .hacker-text {
            font-family: 'Press Start 2P', cursive;
            text-shadow: 0 0 10px #00ff00;
            line-height: 1.8;
          }
        `}
      </style>
      <div className="container mx-auto px-4 py-4">
        <p className="text-[#00ff00] hacker-text text-xs text-center">
          © 2025 Abdullah Sheikh. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
