import React, { useState } from 'react';

export const InputFieldPage: React.FC = () => {
    const [value, setValue] = useState('');

    return (
        <main>
            <form>
                <div>
                    <label htmlFor="accessible-input">Your Name</label>
                    <input
                        id="accessible-input"
                        type="text"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        aria-label="Your Name"
                        autoComplete="name"
                    />
                </div>
            </form>
        </main>
    );
};