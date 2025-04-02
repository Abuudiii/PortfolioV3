import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PortoBeats = () => {
  const [command1, setCommand1] = useState(''); // First terminal command
  const [command2, setCommand2] = useState(''); // Second terminal command
  const [output, setOutput] = useState('');
  const [codeOutput, setCodeOutput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const [descriptionShown, setDescriptionShown] = useState(false);
  const [showSecondTerminal, setShowSecondTerminal] = useState(false);
  const navigate = useNavigate();

  const description = `PortoBeats is an innovative music production platform that combines 
cutting-edge technology with intuitive design. Built with React and Node.js, 
it offers:

- Real-time audio processing
- Virtual drum machines and synthesizers
- Cloud-based project collaboration
- AI-powered music suggestions
- Professional-grade mixing tools`;

  const sampleCode = `// Audio Processing Module
class AudioProcessor {
  constructor() {
    this.context = new AudioContext();
    this.effects = new Map();
  }

  async initializeBeat() {
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    return { oscillator, gainNode };
  }

  addEffect(name, effect) {
    this.effects.set(name, effect);
  }
}`;

  const typeDescription = async () => {
    setIsTyping(true);
    setOutput('');
    for (let i = 0; i < description.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 10)); // Reduced from 25 to 10
      setOutput(prev => prev + description[i]);
    }
    setIsTyping(false);
    setDescriptionShown(true);
    setShowSecondTerminal(true);
  };

  const typeCode = async () => {
    setIsTyping(true);
    setCodeOutput('');
    for (let i = 0; i < sampleCode.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 10)); // Reduced from 25 to 10
      setCodeOutput(prev => prev + sampleCode[i]);
    }
    setIsTyping(false);
  };

  const handleCommand1 = async (e) => {
    if (e.key === 'Enter') {
      const cmd = command1.trim().toLowerCase();
      if (cmd === 'cat description') {
        setError('');
        await typeDescription();
      } else if (cmd === 'cd ..') {
        navigate('/projects');
      } else {
        setError('Command not recognized. Try "cat description" or "cd .."');
        setTimeout(() => setError(''), 3000);
      }
      setCommand1('');
    }
  };

  const handleCommand2 = async (e) => {
    if (e.key === 'Enter') {
      const cmd = command2.trim().toLowerCase();
      if (cmd === 'nano code.c') {
        setError('');
        await typeCode();
      } else {
        setError('Command not recognized. Try "nano code.c"');
        setTimeout(() => setError(''), 3000);
      }
      setCommand2('');
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        {/* Instructions with bright green color */}
        <p className="text-[#00ff00] hacker-text text-xs mb-4 opacity-75">
          Type 'cd ..' to return to projects page
        </p>
        
        <div className="terminal-container">
          {/* First Terminal */}
          <div className="terminal-prompt bg-black/30 backdrop-blur-sm p-3 rounded-md">
            <div className="flex items-center">
              <span className="text-[#00ff00] mr-2 hacker-text text-xs">$</span>
              <input
                type="text"
                value={command1}
                onChange={(e) => setCommand1(e.target.value)}
                onKeyDown={handleCommand1}
                className="bg-transparent text-[#00ff00] outline-none w-full hacker-text text-xs"
                spellCheck="false"
                disabled={isTyping}
                autoFocus
                placeholder="cat description"
              />
            </div>
            {error && (
              <div className="text-red-500 text-xs mt-2 hacker-text">{error}</div>
            )}
          </div>
          {output && (
            <pre className="text-[#00ff00] hacker-text text-xs whitespace-pre-wrap mt-4 leading-relaxed">
              {output}
            </pre>
          )}
          
          {showSecondTerminal && (
            <div className="terminal-prompt bg-black/30 backdrop-blur-sm p-3 rounded-md mt-4">
              <div className="flex items-center">
                <span className="text-[#00ff00] mr-2 hacker-text text-xs">$</span>
                <input
                  type="text"
                  value={command2}
                  onChange={(e) => setCommand2(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && command2.trim() === 'cd ..') {
                      navigate('/projects');
                    } else {
                      handleCommand2(e);
                    }
                  }}
                  className="bg-transparent text-[#00ff00] outline-none w-full hacker-text text-xs"
                  spellCheck="false"
                  disabled={isTyping}
                  placeholder="nano code.c"
                />
              </div>
            </div>
          )}
          {codeOutput && (
            <pre className="text-[#00ff00] hacker-text text-xs whitespace-pre-wrap mt-4 leading-relaxed">
              {codeOutput}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortoBeats;