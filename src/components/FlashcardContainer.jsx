import React, { useState } from 'react';
import Flashcard from './Flashcard';
import ScoreTracker from './ScoreTracker'; // Importing ScoreTracker
import './Flashcard.css';

function FlashcardContainer() {
  const cardSet = [
    { question: "Who directed *Inception*?", answer: "Christopher Nolan", type: "movie" },
    { question: "Who played Iron Man in the MCU?", answer: "Robert Downey Jr.", type: "movie" },
    { question: "Which show features Walter White?", answer: "*Breaking Bad*", type: "tv" },
    { question: "In which year was *Titanic* released?", answer: "1997", type: "movie" },
    { question: "Which movie won Best Picture in 2020?", answer: "*Parasite*", type: "movie" },
    { question: "Which actor voiced Woody in *Toy Story*?", answer: "Tom Hanks", type: "movie" },
    { question: "In *Friends*, what is the name of Ross's second wife?", answer: "Emily", type: "tv" },
    { question: "Who directed the 1994 movie *Pulp Fiction*?", answer: "Quentin Tarantino", type: "movie" },
    { question: "Which TV show follows the lives of the Pearson family across different time periods?", answer: "*This Is Us*", type: "tv" },
    { question: "In *Harry Potter*, what is the name of the Weasley family's house?", answer: "The Burrow", type: "movie" },
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(-1); // -1 for "Are you ready?" card
  const [shuffledCards, setShuffledCards] = useState([...cardSet]); // Keep a shuffled version
  const [usedIndices, setUsedIndices] = useState([]); // Track used cards
  const [isFlipped, setIsFlipped] = useState(false); // Track flip state
  const [guess, setGuess] = useState(''); // Store the user's guess
  const [showGuessInput, setShowGuessInput] = useState(false); // Control when to show input

  // Function to handle score changes
  const [score, setScore] = useState(0);

  // Shuffle function
  const shuffleCards = () => {
    let shuffled = [...cardSet];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledCards(shuffled);
    setUsedIndices([]);
    setCurrentCardIndex(-1); // Reset to "Are you ready?" card
    setScore(0); // Reset score when shuffling
  };

  const nextCard = () => {
    setIsFlipped(false); // Reset to the question side when moving to the next card
    setGuess(''); // Clear guess input
    setShowGuessInput(true); // Show guess input for new card

    if (currentCardIndex === -1) {
      // First card after "Are you ready?"
      setCurrentCardIndex(0);
    } else if (usedIndices.length < shuffledCards.length) {
      // Choose the next random card that hasn't been used yet
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * shuffledCards.length);
      } while (usedIndices.includes(randomIndex));

      setUsedIndices([...usedIndices, randomIndex]);
      setCurrentCardIndex(randomIndex);
    } else {
      // All cards have been used, reset for another round
      alert("You've gone through all the cards! Click 'Shuffle' to play again.");
      setShowGuessInput(false); // Hide input when the round is over
    }
  };

  const prevCard = () => {
    if (usedIndices.length > 1) {
      // Get the second-to-last index in usedIndices (previous card)
      const previousIndex = usedIndices[usedIndices.length - 2];
      setUsedIndices(usedIndices.slice(0, -1)); // Remove the current card from the usedIndices
      setCurrentCardIndex(previousIndex); // Set the current card index to the previous one
      setIsFlipped(false); // Flip the card back to the question side
      setShowGuessInput(true); // Show the input field for guessing
    } else if (currentCardIndex !== -1) {
      // Case when the user is on the first card but not on the "Are you ready?" card
      setCurrentCardIndex(-1); // Reset to the "Are you ready?" card
      setIsFlipped(false); // Ensure the card is flipped to the question side
      setShowGuessInput(true); // Show the input field for guessing
    } else {
      // If we're on the "Are you ready?" card or haven't moved forward
      alert("This is the first card. You can't go back any further.");
    }
  };
    

  // Handle guess submission
  const handleGuessSubmit = (e) => {
    e.preventDefault();
    if (guess.trim().toLowerCase() === shuffledCards[currentCardIndex].answer.toLowerCase()) {
      setScore(score + 1); // Increase score for correct guess
      alert('Correct!');
    } else {
      alert(`Wrong! The correct answer was: ${shuffledCards[currentCardIndex].answer}`);
    }
    setShowGuessInput(false); // Hide input after guess
    setIsFlipped(true); // Show the answer
  };

  return (
    <div className="flashcard-container">
      {/* Using ScoreTracker to display the score */}
      <ScoreTracker score={score} />

      {currentCardIndex === -1 ? (
        <Flashcard
          question="Are you ready? Click on the card."
          answer="Click Next to go to the next card and flip over for the answer."
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
        />
      ) : (
        <Flashcard
          question={shuffledCards[currentCardIndex].question}
          answer={shuffledCards[currentCardIndex].answer}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
          type={shuffledCards[currentCardIndex].type} // Pass type here
        />
      )}

      {showGuessInput && (
        <form onSubmit={handleGuessSubmit}>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess"
          />
          <button type="submit">Submit Guess</button>
        </form>
      )}

      <button onClick={prevCard}>Back</button>
      <button onClick={nextCard}>Next</button>
      <button onClick={shuffleCards}>Shuffle</button>
    </div>
  );
}

export default FlashcardContainer;
