import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Components/signup/Login.js";
import Header from  "./Components/Header/Header.js";
import Content from './Components/Contents/Content.js';
import Home from './Components/HomePage/Home.js';
import AddContent from './Components/Contents/AddContent.js';

function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/content" element={<Content />} />
        <Route path="/addContent" element={<AddContent />} />
    </Routes>
</Router>
  );
}

export default App;
