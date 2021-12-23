import './App.css';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Navigation from './components/Navegation/Navigation';
import HomeComp from './components/HomeComp/HomeComp';
import Whiteboard from './components/Whiteboard/Whiteboard';

function App() {
  return (
    <Router className="App">
 
      <Navigation />

      <Routes>

        <Route path="/" exact element={<Navigate to="/home" />}/>

        <Route path="/home" exact element={<HomeComp />}/>

        <Route path="/whiteboard/:model" element={<Whiteboard />} />

      </Routes>
    </Router>
  );
}

export default App;
