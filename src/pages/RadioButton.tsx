import React, { useState } from "react";

const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
];

export const RadioButtonPage: React.FC = () => {
    const [selected, setSelected] = useState<string>(options[0].value);

    return (
        <main id="main-content" role="main" style={{ padding: '1rem' }}>
            <h1>Accessible Radio Button Example</h1>
            <form>
                <fieldset>
                    <legend>Choose an option</legend>
                    {options.map((option) => (
                        <div key={option.value}>
                            <input
                                type="radio"
                                id={option.value}
                                name="example"
                                value={option.value}
                                checked={selected === option.value}
                                onChange={() => setSelected(option.value)}
                                aria-checked={selected === option.value}
                            />
                            <label htmlFor={option.value}>{option.label}</label>
                        </div>
                    ))}
                </fieldset>
            </form>
            <p>
                Selected option: <strong>{options.find(o => o.value === selected)?.label}</strong>
            </p>
        </main>
    );
};