import React from 'react';
import './Flashcard.css';

function Flashcard({ question, answer, isFlipped, setIsFlipped, type }) {
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flashcard ${type}`} onClick={flipCard}>
      <div className={`card-content ${isFlipped ? 'flipped' : ''}`}>
        {isFlipped ? <p>{answer}</p> : <p>{question}</p>}
      </div>
    </div>
  );
}

export default Flashcard;