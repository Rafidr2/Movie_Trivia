import React, { useState } from "react";

function Flashcard({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="flashcard" onClick={() => setShowAnswer(!showAnswer)}>
      {showAnswer ? <p>{answer}</p> : <p>{question}</p>}
    </div>
  );
}

export default Flashcard;