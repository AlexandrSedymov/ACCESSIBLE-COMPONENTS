import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

// Helper function to merge Tailwind classes, as per best practices
function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

// Define the props for our component
type ResponsiveSquareProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * A responsive square component that maintains a 1:1 aspect ratio
 * and centers its content.
 */
export const ResponsiveSquare = ({ children, className }: ResponsiveSquareProps) => {
  return (
    <div
      className={cn(
        'w-full', // Take up the full width of the parent container
        'max-w-[70%]', // Set a maximum width of 70%
        'aspect-square', // Maintain a 1:1 aspect ratio (the magic part)
        'max-h-[720px]', // Set a maximum height of 720px
        'mx-auto', // Center the element horizontally
        'my-6', // Add vertical margin
        'bg-gray-200', // A default background color
        'dark:bg-gray-800',
        'rounded-lg', // Nice rounded corners
        'flex', // Use flexbox for centering
        'items-center', // Center content vertically
        'justify-center', // Center content horizontally
        'p-4', // Add some padding inside the square
        className // Allow for custom classes to be passed in
      )}
    >
      <div className="text-center text-gray-800 dark:text-gray-200">
        {children}
      </div>
    </div>
  );
};

