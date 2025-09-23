import React from 'react';
import '../styles/CodeExample.css';

type CodeExampleProps = {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
    title?: string;
    defaultOpen?: boolean;
};

const CodeExample: React.FC<CodeExampleProps> = ({
    code,
    title = 'View Code',
    defaultOpen = false,
}) => (
    <details className="code-example-spoiler" open={defaultOpen}>
        <summary className="code-example-summary" tabIndex={0}>
            <span className="code-example-icon" aria-hidden="true">▶</span>
            <span className="code-example-title">{title}</span>
        </summary>
        <div className="code-example-content">
            <pre style={{
                background: '#f8f9fa',
                padding: '16px',
                borderRadius: '0 0 7px 7px',
                fontFamily: 'Monaco, "Menlo", "Ubuntu Mono", Consolas, "Courier New", monospace',
                fontSize: '13px',
                overflow: 'auto',
                margin: 0,
                color: '#333',
                border: '1px solid #e9ecef',
                borderTop: 'none'
            }}>
                <code>{code}</code>
            </pre>
        </div>
    </details>
);

export default CodeExample;