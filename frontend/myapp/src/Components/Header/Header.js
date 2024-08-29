import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Header.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const Header = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/Login");
    };

    const handleSidebarToggle = () => {
        setSidebarOpen(prevState => !prevState);
    };

    // const handleSearchChange = (e) => {
    //     setSearchInput(e.target.value);
    // };

    const addarticleandfile = () =>{
        navigate("/addContent");
    }

    const handleSearch =  () => {
                
        navigate("/searchdata");

        // try {
        //     const response = await axios.get('http://localhost:8080/search/searchall', {
        //         params: { query: searchInput }
        //     });
        //     setSearchResults(response.data.data);
        //     navigate("/searchdata");
        // } catch (err) {
        //     console.error('Error searching:', err);
        // }
        
    };
    const ShowMyArticle = () =>{
        navigate("/myarticle")
    }

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <nav className={`sidebar bg-light ${sidebarOpen ? 'open' : ''}`}>
                <button
                    className="btn btn-secondary d-md sidebar-toggle"
                    onClick={handleSidebarToggle}
                >
                    <i className="fas fa-bars"></i>
                </button>
                <div className="sidebar-content">
                    <a className="navbar-brand" href="#">
                        <img
                            src="articlrlogo.png"
                            height="50"
                            alt="Logo"
                            loading="lazy"
                        />
                    </a>
                    <ul className="nav flex-column">
                        {/* Navigation Items */}
                        <li className="nav-item">
                            <a className="nav-link" href="#">News</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Education</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Technical</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Health</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={ShowMyArticle}>My Article</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" id="addarticle" onClick={addarticleandfile}>Add Your Article</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" id="logout" onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>

                    <div className="d-flex flex-column align-items-center mt-4">
                        {/* <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Search"
                            value={searchInput}
                            onChange={handleSearchChange}
                        /> */}
                        <button
                            className="btn btn-outline-primary mb-2"
                            onClick={handleSearch}
                        >
                            <i className="fas fa-search">    Search   </i>
                        </button>
                        {/* Handle search results display */}
                        {/* <div className="search-results mt-3">
                            {searchResults.length > 0 ? (
                                <ul className="list-group">
                                    {searchResults.map((result, index) => (
                                        <li key={index} className="list-group-item">
                                            {result.title}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No results found</p>
                            )}
                        </div> */}
                        {/* Other components */}
                    </div>
                </div>
            </nav>

            {/* Content */}
            <div className={`content p-4 ${sidebarOpen ? 'content-expanded' : ''}`}>
                <button
                    className="btn btn-secondary d-md- sidebar-toggle"
                    onClick={handleSidebarToggle}
                >
                    <i className="fas fa-bars"></i> Menu
                </button>
                {/* Your main content goes here */}
            </div>
        </div>
    );
};

export default Header;
