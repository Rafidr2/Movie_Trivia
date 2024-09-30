import { useState } from 'react';
import './App.css';
import FlashcardContainer from './components/FlashcardContainer';

function App() {
  const title = "Movie/TV Trivia Flashcards";
  const description = "Test your knowledge of popular movies and TV shows!";
  const totalCards = 10;

  return (
    <div className="app">
      <h1>{title}</h1>
      <p>{description}</p>
      <p>Total Cards: {totalCards}</p>
      <FlashcardContainer />
    </div>
  );
}

export default App;
