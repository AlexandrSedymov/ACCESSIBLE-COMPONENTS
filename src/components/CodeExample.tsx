import React, { lazy, Suspense, useState, useEffect } from 'react';
import '../styles/CodeExample.css';

// Lazy load only the light version of SyntaxHighlighter with specific languages
const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter/dist/esm/light'));

type CodeExampleProps = {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
    title?: string;
    defaultOpen?: boolean;
};

// Simple loading component for syntax highlighter
const SyntaxHighlighterSkeleton: React.FC = () => (
    <div style={{
        background: '#282c34',
        color: '#abb2bf',
        padding: '16px',
        borderRadius: '0 0 7px 7px',
        fontFamily: 'Monaco, "Menlo", "Ubuntu Mono", monospace',
        fontSize: '13px',
        minHeight: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        Loading syntax highlighter...
    </div>
);

// Inner component that uses the lazy-loaded syntax highlighter
const CodeContent: React.FC<CodeExampleProps> = ({
    code,
    language = 'tsx',
    showLineNumbers = true
}) => {
    const [theme, setTheme] = useState<any>(null);
    const [languageLoaded, setLanguageLoaded] = useState(false);

    useEffect(() => {
        const loadDependencies = async () => {
            // Load theme
            const themeModule = await import('react-syntax-highlighter/dist/esm/styles/prism/one-dark');
            setTheme(themeModule.default);

            // Register only the languages we need
            const { default: SyntaxHighlighterComponent } = await import('react-syntax-highlighter/dist/esm/light');
            
            // Import specific language support
            const javascriptLang = await import('react-syntax-highlighter/dist/esm/languages/prism/javascript');
            const typescriptLang = await import('react-syntax-highlighter/dist/esm/languages/prism/typescript');
            const jsxLang = await import('react-syntax-highlighter/dist/esm/languages/prism/jsx');
            const tsxLang = await import('react-syntax-highlighter/dist/esm/languages/prism/tsx');
            const cssLang = await import('react-syntax-highlighter/dist/esm/languages/prism/css');
            const htmlLang = await import('react-syntax-highlighter/dist/esm/languages/prism/markup');
            
            // Register languages
            SyntaxHighlighterComponent.registerLanguage('javascript', javascriptLang.default);
            SyntaxHighlighterComponent.registerLanguage('typescript', typescriptLang.default);
            SyntaxHighlighterComponent.registerLanguage('jsx', jsxLang.default);
            SyntaxHighlighterComponent.registerLanguage('tsx', tsxLang.default);
            SyntaxHighlighterComponent.registerLanguage('css', cssLang.default);
            SyntaxHighlighterComponent.registerLanguage('html', htmlLang.default);
            SyntaxHighlighterComponent.registerLanguage('markup', htmlLang.default);
            
            setLanguageLoaded(true);
        };

        loadDependencies().catch(console.error);
    }, []);

    if (!theme || !languageLoaded) {
        return <SyntaxHighlighterSkeleton />;
    }

    return (
        <Suspense fallback={<SyntaxHighlighterSkeleton />}>
            <SyntaxHighlighter
                language={language}
                style={theme}
                showLineNumbers={showLineNumbers}
                wrapLongLines
            >
                {code}
            </SyntaxHighlighter>
        </Suspense>
    );
};

const CodeExample: React.FC<CodeExampleProps> = ({
    code,
    language = 'tsx',
    showLineNumbers = true,
    title = 'View Code',
    defaultOpen = false,
}) => (
    <details className="code-example-spoiler" open={defaultOpen}>
        <summary className="code-example-summary" tabIndex={0}>
            <span className="code-example-icon" aria-hidden="true">▶</span>
            <span className="code-example-title">{title}</span>
        </summary>
        <div className="code-example-content">
            <CodeContent
                code={code}
                language={language}
                showLineNumbers={showLineNumbers}
            />
        </div>
    </details>
);

export default CodeExample;