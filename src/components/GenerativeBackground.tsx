// GenerativeBackground.tsx
import React from 'react';
import '../styles/GenerativeBackground.css';

// Base (original) pattern class names
export const BASE_GENERATIVE_PATTERNS = [
  'blueprint',
  'starry-night',
  'fine-mesh'
] as const;

// Newly added pattern class names (patterns 4–9)
export const NEW_GENERATED_PATTERNS = [
  'diagonal-stripes',
  'isometric-grid',
  'circuit-board',
  'concentric-rings',
  'gradient-waves',
  'hex-mesh'
] as const;

// Convenience: all patterns combined
export const ALL_GENERATIVE_PATTERNS = [
  ...BASE_GENERATIVE_PATTERNS,
  ...NEW_GENERATED_PATTERNS
] as const;

// Type representing any valid pattern class
export type PatternStyle = typeof ALL_GENERATIVE_PATTERNS[number];

interface GenerativeBackgroundProps {
  children?: React.ReactNode;
  pattern: PatternStyle; // The 'pattern' prop is now required
  className?: string; // Optional prop for additional custom classes
}

const GenerativeBackground: React.FC<GenerativeBackgroundProps> = ({
  children,
  pattern,
  className,
}) => {
  // Combine the base class, the chosen pattern class, and any extra classes
  const combinedClasses = [
    'generative-background-base',
    pattern,
    className
  ].filter(Boolean).join(' '); // .filter(Boolean) removes any undefined/null values

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
};

export default GenerativeBackground;