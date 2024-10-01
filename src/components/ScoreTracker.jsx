import React, { useState } from 'react';
import './ScoreTracker.css';

function ScoreTracker() {
  const [score, setScore] = useState(0);

  const increaseScore = () => {
    setScore(score + 1);
  };

  const decreaseScore = () => {
    if (score > 0) {
      setScore(score - 1);
    }
  };

  return (
    <div className="score-tracker">
      <p>Keep your score as you go through the quiz!</p>
      <div className="score-controls">
        <button onClick={decreaseScore}>-</button>
        <p>Score: {score}</p>
        <button onClick={increaseScore}>+</button>
      </div>
    </div>
  );
}

export default ScoreTracker;
