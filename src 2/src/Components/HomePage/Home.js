import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// Make sure this includes styles for the sidebar
// import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Login from "../signup/Login.js";
import Header from "../Header/Header.js";
import Content from "../Contents/Content.js";
// import "./Header.css"; 
// import 'mdbreact/dist/css/mdb.css';

const Home = () => {
    

    return (
       <>
       <Header/>
       <Content/>
       </>
    );
};

export default Home;
