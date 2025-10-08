import React from 'react';
import '../styles/utilities.css';
import '../styles/ModalDialog.css';
import { InformationModal } from '../components/InformationModal';
import { NativeAlertDialog } from '../components/NativeAlertDialog';
import { LibraryModal } from '../components/LibraryModal';
import CodeExample from '../components/CodeExample';
import alertDialogLogicCode from '../code-example/alert-dialog-logic.txt?raw';
import informationalDialogLogicCode from '../code-example/information-dialog-logic.txt?raw';
import libraryModalLogicCode from '../code-example/library-modal-logic.txt?raw';
import LinkSection from '../components/LinkSection';

export const ModalDialog: React.FC = () => {
  return (
    <main id="main-content" role="main" className="container-padding-sm">
      <h1 className="page-title modal-page-title" id="main-title">Accessible Modal Dialog Examples</h1>

      {/* Information Modal Example */}
      <div className="modal-example">
        <div className="modal-example-left">
          <h2>Information Modal</h2>
          <p>
            A React state-based modal with submit and cancel actions, close icon, and custom focus
            management.
          </p>
          <InformationModal />
        </div>
        <div className="code-container modal-example-right">
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
          <p>
            Uses the HTML5 &lt;dialog&gt; element with .showModal() method for native browser modal
            behavior.
          </p>
          <NativeAlertDialog />
        </div>
        <div className="code-container modal-example-right">
          <div className="code-example-title">Code Example</div>
          <p>Native HTML dialog implementation with showModal() and automatic focus management.</p>
          <CodeExample code={alertDialogLogicCode} title="Native HTML Dialog Code" language="tsx" />
        </div>
      </div>

      {/* Library Modal Example */}
      <div className="modal-example">
        <div className="modal-example-left">
          <h2>Library Modal Dialog</h2>
          <p>
            Uses open-source UI library (Radix UI) with built-in accessibility. Demonstrates confirmation dialog pattern with library-based state management and accessibility features.
          </p>
          <LibraryModal />
        </div>
        <div className="code-container modal-example-right">
          <div className="code-example-title">Code Example</div>
          <p>Open-source UI library (Radix UI) implementation with controlled state, form integration, and accessibility features.</p>
          <CodeExample code={libraryModalLogicCode} title="Library Modal Code" language="tsx" />
        </div>
      </div>
      
      <LinkSection
        labelId='useful-links'
        links={[
          {
            label: 'W3C Modal Dialog Example',
            url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/',
          },
          {
            label: 'W3C Dialog Modal Pattern - Focus Management',
            url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
          },
          {
            label: 'German Federal IT - Accessible Modal Dialog Guide',
            url: 'https://handreichungen.bfit-bund.de/accessible-uie/modaler_dialog.html',
          },
          {
            label: 'U.S. Web Design System - Modal Component',
            url: 'https://designsystem.digital.gov/components/modal/',
          },
          {
            label: 'Radix UI Dialog Documentation',
            url: 'https://www.radix-ui.com/docs/primitives/components/dialog',
          },
          {
            label: 'MDN Web Docs: Dialog',
            url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog',
          },
        ]}
      />

      <LinkSection
        labelId='common-issues'
        title="Usual issues with recommendation how to fix them:"
        links={[
          {
            label: 'Screen readers can read parent page content outside the modal',
            url: 'https://docs.deque.com/issue-help/1.0.0/en/reading-order-browse-outside-modal',
          },
          {
            label: 'When the modal is activated, focus is not placed on the modal',
            url: 'https://docs.deque.com/issue-help/1.0.0/en/focus-modal-none',
          },
          {
            label: 'Focus is not maintained within the modal. It is possible to tab out of the modal',
            url: 'https://docs.deque.com/issue-help/1.0.0/en/focus-modal-moves-outside',
          },
          {
            label: 'When the modal or similar element is closed, focus is not returned to the triggering element',
            url: 'https://docs.deque.com/issue-help/1.0.0/en/focus-modal-not-returned',
          },
        ]}
      />
    </main>
  );
};
