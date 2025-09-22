import React from 'react';
import '../styles/Home.css';

export const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to the Home Page</h1>
            <p className="home-description">This is the main landing page of the application.</p>
        </div>
    );
};