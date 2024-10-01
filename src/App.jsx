import { useState } from 'react';
import './App.css';
import FlashcardContainer from './components/FlashcardContainer'; // Import the container component
import ScoreTracker from './components/ScoreTracker'; // Import the score tracker

function App() {
  const title = "Movie/TV Trivia Flashcards";
  const description = "Test your knowledge of popular movies and TV shows!";
  const totalCards = 10;

  return (
    <div className="app">
      <div className="header">
        <h1>{title}</h1>
        <ScoreTracker />
      </div>
      <p>{description}</p>
      <p>Total Cards: {totalCards}</p>
      <FlashcardContainer />
    </div>
  );
}

export default App;

