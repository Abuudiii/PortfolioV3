import React, { useState, useEffect } from 'react';

const CrypticHoverText = ({ text, className }) => {
  const [words, setWords] = useState([]);
  const [decryptedIndices, setDecryptedIndices] = useState(new Set());
  const [isDecrypting, setIsDecrypting] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%";

  // Split text into words and initialize random text for each word
  useEffect(() => {
    const wordArray = text.split(/(\s+)/); // Split by whitespace but keep the separators
    const initialWords = wordArray.map(word => {
      if (word.trim() === '') return word; // Keep whitespace as is
      return Array(word.length).fill().map(() => 
        chars[Math.floor(Math.random() * chars.length)]
      ).join('');
    });
    setWords(initialWords);
  }, [text]);

  // Handle decryption
  useEffect(() => {
    let interval;
    
    if (isDecrypting && decryptedIndices.size < words.length) {
      interval = setInterval(() => {
        setDecryptedIndices(prev => {
          const newSet = new Set(prev);
          // Find the next non-whitespace word to decrypt
          for (let i = 0; i < words.length; i++) {
            if (!newSet.has(i) && words[i].trim() !== '') {
              newSet.add(i);
              break;
            }
          }
          if (newSet.size === words.length) {
            clearInterval(interval);
          }
          return newSet;
        });
      }, 100); // Decrypt one word every 100ms (reduced from 200ms)
    }

    return () => clearInterval(interval);
  }, [isDecrypting, words.length]);

  // Combine words with proper spacing
  const displayedText = words.map((word, index) => {
    if (decryptedIndices.has(index)) {
      return text.split(/(\s+)/)[index];
    }
    return word;
  }).join('');

  return (
    <span 
      className={className}
      onMouseEnter={() => setIsDecrypting(true)}
    >
      {displayedText}
      {!isDecrypting && <span className="animate-pulse">|</span>}
    </span>
  );
};

export default CrypticHoverText; 