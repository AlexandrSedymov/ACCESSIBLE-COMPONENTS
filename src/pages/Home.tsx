import React from 'react';
import '../styles/Home.css';

export const Home: React.FC = () => {
    return (
        <main className="home-container" role="main" id="main-content">
            <title>Accessibility Components - Learn & Build Accessible UI</title>
            <meta name="description" content="A comprehensive collection of accessible-first UI components with practical examples for developers." />
            <h1 className="home-title">Welcome to the ACCESSIBILITY COMPONENTS Home Page</h1>
            <p className="home-description">A collection of practical, accessible-first UI components. This project serves as a living guide to implementing web accessibility, providing documented examples for developers to learn from and use.</p>
        </main>
    );
};