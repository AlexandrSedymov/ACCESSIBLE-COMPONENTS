import './App.css';
import './styles/SkipLink.css';

import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { ModalDialog } from './pages/ModalDialog';
import { LinksVsButtons } from './pages/LinksVsButtons';
import { RadioButtonPage } from './pages/RadioButton';
import { InputFieldPage } from './pages/InputField';
import { useFocusManagement } from './hooks/useFocusManagement';

function AppContent() {
  // Enable automatic focus management for navigation
  useFocusManagement();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modal-dialog" element={<ModalDialog />} />
        <Route path="/links-vs-buttons" element={<LinksVsButtons />} />
        <Route path="/radio-buttons" element={<RadioButtonPage />} />
        <Route path="/input-fields" element={<InputFieldPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
