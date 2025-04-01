import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        {/* Custom styles for global use */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
            .hacker-text {
              font-family: 'Press Start 2P', cursive;
              text-shadow: 0 0 10px #00ff00;
            }
            .hacker-border {
              border: 2px solid #00ff00;
              box-shadow: 0 0 10px #00ff00;
            }
          `}
        </style>

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
