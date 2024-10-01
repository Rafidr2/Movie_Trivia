import React, { useState } from 'react';
import Flashcard from './Flashcard';
import './Flashcard.css';

function FlashcardContainer() {
  const cardSet = [
    { question: "Who directed *Inception*?", answer: "Christopher Nolan" },
    { question: "Who played Iron Man in the MCU?", answer: "Robert Downey Jr." },
    { question: "Which show features Walter White?", answer: "*Breaking Bad*" },
    { question: "In which year was *Titanic* released?", answer: "1997" },
    { question: "Which movie won Best Picture in 2020?", answer: "*Parasite*" },
    { question: "Which actor voiced Woody in *Toy Story*?", answer: "Tom Hanks" },
    { question: "In *Friends*, what is the name of Ross's second wife?", answer: "Emily" },
    { question: "Who directed the 1994 movie *Pulp Fiction*?", answer: "Quentin Tarantino" },
    { question: "Which TV show follows the lives of the Pearson family across different time periods?", answer: "*This Is Us*" },
    { question: "In *Harry Potter*, what is the name of the Weasley family's house?", answer: "The Burrow" },
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(-1); // -1 indicates the "Are you ready?" card
  const [usedIndices, setUsedIndices] = useState([]); // Track used cards
  const [isFlipped, setIsFlipped] = useState(false); // Track flip state

  const nextCard = () => {
    setIsFlipped(false); // Reset to the question side when moving to the next card

    if (currentCardIndex === -1) {
      // First card after "Are you ready?"
      setCurrentCardIndex(0);
    } else if (usedIndices.length < cardSet.length) {
      // Choose the next random card that hasn't been used yet
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * cardSet.length);
      } while (usedIndices.includes(randomIndex));

      setUsedIndices([...usedIndices, randomIndex]);
      setCurrentCardIndex(randomIndex);
    } else {
      // All cards have been used, reset for another round
      alert("You've gone through all the cards! Click ok to start again.");
      setUsedIndices([]); // Reset used indices
      setCurrentCardIndex(-1); // Show the "Are you ready?" card again
    }
  };

  return (
    <div className="flashcard-container">
      {currentCardIndex === -1 ? (
        <Flashcard
          question="Are you ready? Click on the card."
          answer="Click Next to go to the next card and flip over for the answer."
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
        />
      ) : (
        <Flashcard
          question={cardSet[currentCardIndex].question}
          answer={cardSet[currentCardIndex].answer}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
        />
      )}
      <button onClick={nextCard}>Next</button>
    </div>
  );
}

export default FlashcardContainer;
