import React from 'react';
import './ScoreTracker.css';

function ScoreTracker({ score }) {
  return (
    <div className="score-tracker">
      <p>Keep your score as you go through the quiz!</p>
      <div className="score-controls">
        <p>Score: {score}</p>
      </div>
    </div>
  );
}

export default ScoreTracker;

