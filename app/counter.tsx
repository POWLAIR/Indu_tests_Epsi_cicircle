"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="counter">
      <h2 data-testid="count-display">{count}</h2>
      <div className="counter-controls">
        <button 
          type="button" 
          onClick={decrement}
          aria-label="Décrémenter"
          className="counter-button"
        >
          -
        </button>
        <button 
          type="button" 
          onClick={increment}
          aria-label="Incrémenter"
          className="counter-button"
        >
          +
        </button>
        <button 
          type="button" 
          onClick={reset}
          aria-label="Réinitialiser"
          className="counter-button"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
