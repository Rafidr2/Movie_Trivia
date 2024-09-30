import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import './Flashcard.css';

function FlashcardContainer() {
  const cardSet = [
    { question: "Who directed *Inception*?", answer: "Christopher Nolan" },
    { question: "Who played Iron Man in the MCU?", answer: "Robert Downey Jr." },
    { question: "Which show features Walter White?", answer: "*Breaking Bad*" },
    { question: "In which year was *Titanic* released?", answer: "1997" },
    { question: "Which movie won Best Picture in 2020?", answer: "*Parasite*" },
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(-1); // -1 indicates the "Are you ready?" card
  const [usedIndices, setUsedIndices] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false); // Toggle instructions

  const nextCard = () => {
    if (currentCardIndex === -1) {
      // This will skip the "Are you ready?" card and go to the first trivia question
      setCurrentCardIndex(0);
    } else {
      // Handle moving to the next random card that hasn't been used
      if (usedIndices.length < cardSet.length) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * cardSet.length);
        } while (usedIndices.includes(randomIndex));

        setUsedIndices([...usedIndices, randomIndex]);
        setCurrentCardIndex(randomIndex);
      } else {
        alert("You've gone through all the cards! Click next to keep playing again."); // This can be replaced with an end-of-game screen
        setUsedIndices([]); // Optionally reset to allow the user to play again
      }
    }
  };

  return (
    <div className="flashcard-container">
      {currentCardIndex === -1 ? (
        <Flashcard
          question="Are you ready? Click on the card."
          answer="Click Next to go to the next card and flip over for the answer. Click once more before starting"
        />
      ) : (
        <Flashcard
          question={cardSet[currentCardIndex].question}
          answer={cardSet[currentCardIndex].answer}
        />
      )}
      <button onClick={nextCard}>Next</button>
    </div>
  );
}

export default FlashcardContainer;
