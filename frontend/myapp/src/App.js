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
import SearchData from "./Components/SearchComponent/searchData.js";
import MyArticle from "./Components/MyArticle/MyArticle.js";
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
        <Route path='/searchdata' element={<SearchData/>}/>
        <Route path='/myarticle' element={<MyArticle/>}/>
        {/* Add other routes as needed */}
    </Routes>
</Router>
  );
}

export default App;
