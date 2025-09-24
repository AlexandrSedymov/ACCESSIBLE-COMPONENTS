import React from "react";
import '../styles/ModalDialog.css';
import { InformationModal } from '../components/InformationModal';
import { NativeAlertDialog } from '../components/NativeAlertDialog';
import CodeExample from '../components/CodeExample';
import alertDialogLogicCode from '../code-example/alert-dialog-logic.txt?raw';
import informationalDialogLogicCode from '../code-example/information-dialog-logic.txt?raw';
import LinkSection from '../components/LinkSection';

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
                    <CodeExample
                        code={informationalDialogLogicCode}
                        title="React Information Modal Code"
                        language="tsx"
                    />
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
                    <CodeExample
                        code={alertDialogLogicCode}
                        title="Native HTML Dialog Code"
                        language="tsx"
                    />
                </div>
            </div>
            <LinkSection links={[{ label: "W3C Modal Dialog Example", url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/" },
            { label: "Modal dialog from atomica11y.", url: "https://www.atomica11y.com/demos/dialog-modal/" },
            { label: "MDN Web Docs: Dialog", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog" },
            { label: "Focus trap React library", url: "https://github.com/focus-trap/focus-trap-react" },
            { label: "Article: Achieving Focus Trapping in a React Modal Component", url: "https://medium.com/cstech/achieving-focus-trapping-in-a-react-modal-component-3f28f596f35b" }]} />
        </main>
    );
};