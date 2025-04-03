// src/components/PulseLink.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import videoFile from '../files/plink.mov'; // Update video file

const PulseLink = () => {
  const [command1, setCommand1] = useState('');
  const [command2, setCommand2] = useState('');
  const [command3, setCommand3] = useState('');
  const [output, setOutput] = useState('');
  const [codeOutput, setCodeOutput] = useState('');
  const [imageOutput, setImageOutput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const [descriptionShown, setDescriptionShown] = useState(false);
  const [showSecondTerminal, setShowSecondTerminal] = useState(false);
  const [showThirdTerminal, setShowThirdTerminal] = useState(false);
  const [showExitInstruction, setShowExitInstruction] = useState(false);
  const navigate = useNavigate();

  const description = `PulseLink Bracelets are a pair of wireless, interactive bracelets designed to connect two individuals over distance. Using force sensors and ESP-NOW communication with ESP32 microcontrollers, each bracelet allows users to send a tactile signal by pressing a button. The signal activates a buzzer on the other bracelet, enabling a unique form of nonverbal communication. PulseLink Bracelets are perfect for partners, friends, or family members who want to feel connected despite being apart.

- Wireless communication using ESP32
- Force Sensing Resistors (FSRs) for input
- Fully 3D-printed ergonomic design
- Low battery move for power efficieny`;

  const sampleCode = `#include <WiFi.h>
#include <esp_now.h>

// Define pins
#define MOTOR_PIN 18          // GPIO pin connected to the transistor base
#define FORCE_SENSOR_PIN 34  // Analog pin connected to the force sensor
const int threshold = 50;  // Adjust based on your sensor readings

// Peer MAC address (replace with the other device's MAC address)
uint8_t peerMAC[] = {0xfc, 0xf5, 0xc4, 0x03, 0xbe, 0xe0};

// Callback function to handle received messages
void onDataReceived(const esp_now_recv_info_t* recvInfo, const uint8_t* data, int dataLen) {
    Serial.println("Message received");
    if (data[0] == 1) {
        digitalWrite(MOTOR_PIN, HIGH);
        delay(1000);
        digitalWrite(MOTOR_PIN, LOW);
    }
}

void setup() {
    Serial.begin(9600);
    WiFi.mode(WIFI_STA);
    pinMode(MOTOR_PIN, OUTPUT);
    esp_now_init();
    esp_now_register_recv_cb(onDataReceived);
    esp_now_peer_info_t peerInfo;
    memcpy(peerInfo.peer_addr, peerMAC, 6);
    peerInfo.channel = 0;
    peerInfo.encrypt = false;
    esp_now_add_peer(&peerInfo);
}

void loop() {
    int sensorValue = analogRead(FORCE_SENSOR_PIN);
    if (sensorValue > threshold) {
        uint8_t message = 1;
        esp_now_send(peerMAC, &message, sizeof(message));
        delay(100);
    }
}`;

  // Keep the same typing logic and handlers but update command checks
  const typeDescription = async () => {
    setIsTyping(true);
    setOutput('');
    for (let i = 0; i < description.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 10));
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

  // Update handleCommand2 and handleCommand3 to include cd .. check
  const handleCommand2 = async (e) => {
    if (e.key === 'Enter') {
      const cmd = command2.trim().toLowerCase();
      if (cmd === 'cd ..') {
        navigate('/projects');
      } else if (cmd === 'nano code.c') {
        setError('');
        await typeCode();
      } else {
        setError('Command not recognized. Try "nano code.c"');
        setTimeout(() => setError(''), 3000);
      }
      setCommand2('');
    }
  };

  const handleCommand3 = async (e) => {
    if (e.key === 'Enter') {
      const cmd = command3.trim().toLowerCase();
      if (cmd === 'cd ..') {
        navigate('/projects');
      } else if (cmd === 'display video.mp4') {
        setError('');
        setImageOutput(videoFile);
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
                  onKeyDown={handleCommand2}
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

export default PulseLink;