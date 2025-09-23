import React, { lazy, Suspense } from 'react';

// Lazy load the CodeExample component to reduce initial bundle size
const LazyCodeExample = lazy(() => import('./CodeExample'));

type CodeExampleProps = {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
    title?: string;
    defaultOpen?: boolean;
};

// Loading fallback component
const CodeExampleSkeleton: React.FC = () => (
    <div className="code-example-spoiler" style={{ 
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        background: '#fafafa'
    }}>
        <div className="code-example-summary" style={{ 
            padding: '12px 16px',
            background: '#f5f5f5',
            color: '#333',
            display: 'flex',
            alignItems: 'center'
        }}>
            <span style={{ marginRight: '8px', fontSize: '12px' }}>▶</span>
            <span>Loading code example...</span>
        </div>
    </div>
);

const CodeExampleLazy: React.FC<CodeExampleProps> = (props) => (
    <Suspense fallback={<CodeExampleSkeleton />}>
        <LazyCodeExample {...props} />
    </Suspense>
);

export default CodeExampleLazy;