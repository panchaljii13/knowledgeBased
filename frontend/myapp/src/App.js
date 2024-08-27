import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'; 
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Components/LoginPage/Login.js";
import Header from  "./Components/Header/Header.js";
import Content from "./Components/Content/Contents.js"
import Home from './Components/HomeComponents/Home.js';
import AddContent from "./Components/Content/AddContent.js"
import UpdateContent from './Components/Content/UpdateContens.js';
// import "./Components/HomePage.css";

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
        <Route path='/updateContent' element={<UpdateContent/>}/>
        {/* Add other routes as needed */}
    </Routes>
</Router>
  );
}

export default App;
