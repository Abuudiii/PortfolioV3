import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import videoFile from '../files/portobeats.MOV'; // Import video file

const PortoBeats = () => {
  const [command1, setCommand1] = useState(''); // First terminal command
  const [command2, setCommand2] = useState(''); // Second terminal command
  const [command3, setCommand3] = useState(''); // New command state
  const [output, setOutput] = useState('');
  const [codeOutput, setCodeOutput] = useState('');
  const [imageOutput, setImageOutput] = useState(''); // New image output state
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const [descriptionShown, setDescriptionShown] = useState(false);
  const [showSecondTerminal, setShowSecondTerminal] = useState(false);
  const [showThirdTerminal, setShowThirdTerminal] = useState(false); // New terminal state
  const navigate = useNavigate();

  const description = `Portobeats is a wearable glove system that allows users to assign different musical instruments to each finger tap on any surface, enabling them to create beats interactively. This project combines wearable technology and music production to create a tangible interaction experience that encourages creativity and exploration.

- Real-time audio processing
- Force sensing resistors for input
- Mappable MIDI signals for different instruments
- Customizable sensitivity and response times
- Lightweight and portable design`;

  const sampleCode = `// This code is for Arduino Due to use 8 FSRs (Force Sensitive Resistors) connected to analog pins A0-A7
// Each FSR corresponds to a different MIDI note to create a mini beat maker.
// You'll need the MIDI library to send MIDI signals via USB.

#include <MIDIUSB.h>

// Define FSR pins
const int fsrPins[8] = {A0, A1, A2, A3, A4, A5, A6, A7};

// Define MIDI note numbers for each FSR
const int midiNotes[8] = {36, 38, 42, 46, 49, 51, 53, 55};

// Define MIDI channels for each FSR
const int midiChannels[8] = {0, 1, 2, 3, 4, 5, 6, 7}; // Channels 1-8

// Threshold value to determine when an FSR is pressed
const int threshold = 100;

// Stores the last state of each FSR to avoid multiple triggers
int lastFSRState[8] = {0, 0, 0, 0, 0, 0, 0, 0};

void setup() {
  // Initialize serial communication for debugging (optional)
  Serial.begin(115200);
}

void loop() {
  // Iterate over each FSR
  for (int i = 0; i < 8; i++) {
    int fsrValue = analogRead(fsrPins[i]);

    // Check if FSR value exceeds the threshold
    if (fsrValue > threshold && lastFSRState[i] == 0) {
      // FSR is pressed, send a MIDI note ON message on a specific channel
      noteOn(midiChannels[i], midiNotes[i], 127);
      Serial.print("FSR ");
      Serial.print(i);
      Serial.println(" pressed");
      lastFSRState[i] = 1;
    } else if (fsrValue <= threshold && lastFSRState[i] == 1) {
      // FSR is released, send a MIDI note OFF message on a specific channel
      noteOff(midiChannels[i], midiNotes[i], 127);
      Serial.print("FSR ");
      Serial.print(i);
      Serial.println(" released");
      lastFSRState[i] = 0;
    }
  }
  delay(10); // Add a small delay to debounce
}

// Send a MIDI note-on message
void noteOn(byte channel, byte pitch, byte velocity) {
  midiEventPacket_t noteOn = {0x09, 0x90 | channel, pitch, velocity};
  MidiUSB.sendMIDI(noteOn);
  MidiUSB.flush();
}

// Send a MIDI note-off message
void noteOff(byte channel, byte pitch, byte velocity) {
  midiEventPacket_t noteOff = {0x08, 0x80 | channel, pitch, velocity};
  MidiUSB.sendMIDI(noteOff);
  MidiUSB.flush();
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
      await new Promise(resolve => setTimeout(resolve, 5)); // Reduced from 10ms to 5ms
      setCodeOutput(prev => prev + sampleCode[i]);
    }
    setIsTyping(false);
    setShowThirdTerminal(true);
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

  // Add handler for third terminal
  const handleCommand3 = async (e) => {
    if (e.key === 'Enter') {
      const cmd = command3.trim().toLowerCase();
      if (cmd === 'display video.mp4') {
        setError('');
        setImageOutput(videoFile); // Use imported video file
        setShowThirdTerminal(true);
      } else {
        setError('Command not recognized. Try "display video.mp4"');
        setTimeout(() => setError(''), 3000);
      }
      setCommand3('');
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

          {/* Third Terminal */}
          {showThirdTerminal && (
            <div className="terminal-prompt bg-black/30 backdrop-blur-sm p-3 rounded-md mt-4">
              <div className="flex items-center">
                <span className="text-[#00ff00] mr-2 hacker-text text-xs">$</span>
                <input
                  type="text"
                  value={command3}
                  onChange={(e) => setCommand3(e.target.value)}
                  onKeyDown={handleCommand3}
                  className="bg-transparent text-[#00ff00] outline-none w-full hacker-text text-xs"
                  spellCheck="false"
                  disabled={isTyping}
                  placeholder="display video.mp4"
                />
              </div>
            </div>
          )}
          {imageOutput && (
            <div className="mt-4 flex justify-center items-center">
              <video 
                src={imageOutput} 
                controls 
                className="max-w-[600px] max-h-[400px] w-auto h-auto"
                autoPlay
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortoBeats;