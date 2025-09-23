import React from "react";
import '../styles/ModalDialog.css';
import { InformationModal } from '../components/InformationModal';
import { NativeAlertDialog } from '../components/NativeAlertDialog';
import CodeExample from '../components/CodeExample';

export const ModalDialog: React.FC = () => {
    return (
        <main id="main-content" role="main" className="modal-page">
            <h1 className="modal-page-title">Accessible Modal Dialog Examples</h1>
            
            {/* Information Modal Example */}
            <div className="modal-example">
                <div className="modal-example-left">
                    <h2>Information Modal</h2>
                    <p>A React state-based modal with submit and cancel actions, close icon, and custom focus management.</p>
                    <InformationModal />
                </div>
                <div className="modal-example-right">
                    <div className="code-example-title">Code Example</div>
                    <p>React implementation with useState and custom focus trapping logic.</p>
                    <CodeExample code={`function greet(name) {\n  console.log(\`Hello, \${name}!\`);\n}`} />
                </div>
            </div>

            {/* Native Alert Dialog Example */}
            <div className="modal-example">
                <div className="modal-example-left">
                    <h2>Native Alert Dialog</h2>
                    <p>Uses the HTML5 &lt;dialog&gt; element with .showModal() method for native browser modal behavior.</p>
                    <NativeAlertDialog />
                </div>
                <div className="modal-example-right">
                    <div className="code-example-title">Code Example</div>
                    <p>Native HTML dialog implementation with showModal() and automatic focus management.</p>
                    {/* Code example will be displayed here */}
                </div>
            </div>
        </main>
    );
};