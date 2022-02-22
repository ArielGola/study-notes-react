import './App.css'; 

import './styles/texts.css';
import './styles/backgrounds.css';
import './styles/whiteboardFormat.css';
import './styles/saveScreenFormat.css';
import './styles/savedNotesFormat.css';
import './styles/navigationFormat.css';
import './styles/homeCompFormat.css';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Navigation from './components/Navegation/Navigation';
import HomeComp from './components/HomeComp/HomeComp';
import Whiteboard from './components/Whiteboard/Whiteboard';
import SavedNotes from './components/SavedNotes/SavedNotes';

function App() {
  return (
    <Router className="App">
 
      <Navigation />

      <Routes>

        <Route path="/" exact element={<Navigate to="/home" />} />

        <Route path="/home" exact element={<HomeComp />} />

        <Route path="/whiteboard/:model" element={<Whiteboard />} />

        <Route path="/saves" element={<SavedNotes />} />

      </Routes>
    </Router>
  );
}

export default App;
