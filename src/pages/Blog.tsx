import GenerativeBackground, { type PatternStyle } from "../components/GenerativeBackground";
import { useState } from "react";

const patterns: PatternStyle[] = [
  'blueprint',
  'starry-night',
  'fine-mesh',
  'diagonal-stripes',
  'isometric-grid',
  'circuit-board',
  'concentric-rings',
  'gradient-waves',
  'hex-mesh'
];

export const Blog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cyclePattern = () => {
    // Move to the next index, looping back to 0 at the end
    const nextIndex = (currentIndex + 1) % patterns.length;
    setCurrentIndex(nextIndex);
  }

    const currentPattern = patterns[currentIndex];

    return (
      <GenerativeBackground pattern={currentPattern}>
        <div className="content-container">
          <h1>Dynamic Backgrounds</h1>
          <p>
            Current pattern: <strong>{currentPattern}</strong>
          </p>
          <button onClick={cyclePattern}>
            Change Pattern
          </button>
        </div>
      </GenerativeBackground>
    );
};