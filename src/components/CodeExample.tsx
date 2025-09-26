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
}) => {
  const uniqueId = React.useId();
  
  return (
  <details className="code-example-spoiler" open={defaultOpen}>
    <summary className="code-example-summary" tabIndex={0} aria-label={title}>
      <span className="code-example-icon" aria-hidden="true">
        ▶
      </span>
      <span className="code-example-title">{title}</span>
    </summary>
    <div className="code-example-content">
      <pre 
        tabIndex={0}
        role="region"
        aria-label={`${codeTitle} for ${title} - Use Ctrl+A to select all code`}
        aria-describedby={`code-instructions-${uniqueId}`}
      >
        <code>{code}</code>
      </pre>
      <div id={`code-instructions-${uniqueId}`} className="sr-only">
        Code block. Press Tab to focus, then use Ctrl+A to select all code for copying.
      </div>
    </div>
  </details>
  );
};

export default CodeExample;
