import React from 'react';
import '../styles/CodeExample.css';

type CodeExampleProps = {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  title?: string;
  codeTitle?: string;
  defaultOpen?: boolean;
};

const CodeExample: React.FC<CodeExampleProps> = ({
  code,
  title = 'View Code',
  codeTitle = 'Code Example',
  defaultOpen = false,
}) => (
  <details className="code-example-spoiler" open={defaultOpen}>
    <summary className="code-example-summary" tabIndex={0} aria-label={title}>
      <span className="code-example-icon" aria-hidden="true">
        ▶
      </span>
      <span className="code-example-title">{title}</span>
    </summary>
    <div className="code-example-content">
      <pre>
        <code aria-label={codeTitle}>{code}</code>
      </pre>
    </div>
  </details>
);

export default CodeExample;
