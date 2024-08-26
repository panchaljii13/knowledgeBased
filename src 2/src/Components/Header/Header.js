import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Header.css"; // Make sure this includes styles for the sidebar
// import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

const Header = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const handleLogout = () => {
        navigate("/Login");
    };

    const handleSidebarToggle = () => {
        setSidebarOpen(prevState => !prevState);
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };
    const addarticleandfile = () =>{
        navigate("/addContent");
    }

    const handleSearch = () => {
        alert(searchInput);
    };
    
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
                            <a className="nav-link" href="#">World</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" id="addarticle" onClick={addarticleandfile}>Add Your Article</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" id="logout" onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                    {/* <button onClick={navigate(hendlearticlepaage)}> Add Article </button> */}

                    <div className="d-flex flex-column align-items-center mt-4">
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Search"
                            value={searchInput}
                            onChange={handleSearchChange}
                        />
                        <button
                            className="btn btn-outline-primary mb-2"
                            onClick={handleSearch}
                        >
                            <i className="fas fa-search"></i>
                        </button>
                        <div className="dropdown">
                            <a
                                className="text-reset dropdown-toggle"
                                href="#"
                                role="button"
                                id="notificationsDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fas fa-bell"></i>
                                <span className="badge rounded-pill badge-notification bg-danger">1</span>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="notificationsDropdown">
                                <li><a className="dropdown-item" href="#">Some news</a></li>
                                <li><a className="dropdown-item" href="#">Another news</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>
                        <div className="dropdown mt-3">
                            <a
                                className="dropdown-toggle d-flex align-items-center"
                                href="#"
                                role="button"
                                id="profileDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                    className="rounded-circle"
                                    height="25"
                                    alt="Profile"
                                    loading="lazy"
                                />
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                                <li><a className="dropdown-item" href="#">My profile</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                            </ul>
                        </div>
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
                {/* <h1>.............................................Welcome to the Home Page.............................................</h1> */}
            </div>
        </div>
    );
};

export default Header;
