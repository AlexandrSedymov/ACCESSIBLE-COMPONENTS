import React from 'react';

export const LinksVsButtons: React.FC = () => {
    return (
        <main>
            <h1>Links vs Buttons</h1>
            <section aria-labelledby="links-section">
                <h2 id="links-section">Accessible Links</h2>
                <ul>
                    <li>
                        <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                            Visit Example.com <span aria-hidden="true">🔗</span>
                            <span className="sr-only">(opens in a new tab)</span>
                        </a>
                    </li>
                    <li>
                        <a href="#buttons-section">Jump to Buttons Section</a>
                    </li>
                </ul>
            </section>

            <section aria-labelledby="buttons-section" style={{ marginTop: '2rem' }}>
                <h2 id="buttons-section">Accessible Buttons</h2>
                <button type="button" onClick={() => alert('Button clicked!')}>
                    Click Me
                </button>
                <button type="submit" aria-label="Submit Form">
                    Submit
                </button>
                <button type="button" disabled aria-disabled="true">
                    Disabled Button
                </button>
            </section>

            {/* Visually hidden class for screen readers */}
            <style>
                {`
                    .sr-only {
                        position: absolute;
                        width: 1px;
                        height: 1px;
                        padding: 0;
                        margin: -1px;
                        overflow: hidden;
                        clip: rect(0,0,0,0);
                        border: 0;
                    }
                `}
            </style>
        </main>
    );
};