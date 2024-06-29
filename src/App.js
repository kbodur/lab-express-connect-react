// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import Index from './components/Index';
import Show from './components/Show';
import NewLog from './components/NewLog';
import EditLog from './components/EditLog';

import './App.css'
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/logs" />} />
          <Route path="/logs" element={<Index />} />
          <Route path="/logs/new" element={<NewLog />} />
          <Route path="/logs/:index" element={<Show />} />
          <Route path="/logs/:index/edit" element={<EditLog />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

