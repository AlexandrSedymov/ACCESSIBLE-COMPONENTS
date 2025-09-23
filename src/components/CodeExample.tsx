import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter'; 
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeExampleProps = {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
};

const CodeExample: React.FC<CodeExampleProps> = ({
    code,
    language = 'tsx',
    showLineNumbers = true,
}) => (
    <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers={showLineNumbers}
        wrapLongLines
    >
        {code}
    </SyntaxHighlighter>
);

export default CodeExample;