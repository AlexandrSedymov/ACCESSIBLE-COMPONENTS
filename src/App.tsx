import './App.css';
import './styles/SkipLink.css';

import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ModalDialog } from './pages/ModalDialog';
import { LinksVsButtons } from './pages/LinksVsButtons';
import { RadioButtonPage } from './pages/RadioButton';
import { InputFieldPage } from './pages/InputField';

function App() {
  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modal-dialog" element={<ModalDialog />} />
        <Route path="/links-vs-buttons" element={<LinksVsButtons />} />
        <Route path="/radio-buttons" element={<RadioButtonPage />} />
        <Route path="/input-fields" element={<InputFieldPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App