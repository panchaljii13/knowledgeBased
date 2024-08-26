import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./Loginpage.css";

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Add state variables for login
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Add validation error state
    const [signUpError, setSignUpError] = useState("");
    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();

    const handleSignUpClick = () => {
        setIsSignUp(true);
        setSignUpError(""); // Clear errors on switch
    };

    const handleSignInClick = () => {
        setIsSignUp(false);
        setLoginError(""); // Clear errors on switch
    };

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        // Basic validation
        if (!name || !email || !password) {
            setSignUpError("All fields are required.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setSignUpError("Invalid email format.");
            return;
        }
        if (password.length < 6) {
            setSignUpError("Password must be at least 6 characters long.");
            return;
        }

        try {
            const response =  await axios.post("http://localhost:8080/user/signup", {
                name,
                email,
                password
            });
            console.log("response",response)
            alert("Sign up successful",response);
            setName("");
            setEmail("");
            setPassword("");
            if (response.data.success) {
                console.log("response",response);

                const { userID } = response.data; // Assume this comes from your backend
                sessionStorage.setItem('UserID', userID); // Store UserID in sessionStorage
                // Redirect to another page or update state as needed
                console.log('Login successful ----, UserID:', userID);
            } else {
                // Handle login failure
                console.error('Login failed:', response.data.message);
            }

        } catch (error) {
            setSignUpError("Error signing up or user already exists. Please try again.");
        }
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        if (!loginEmail || !loginPassword) {
            setLoginError("All fields are required.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(loginEmail)) {
            setLoginError("Invalid email format.");
            return;
        }
        if (loginPassword.length < 6) {
            setLoginError("Password must be at least 6 characters long.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/user/login", {
                email: loginEmail,
                password: loginPassword
            });

            // set user data in session storage
           const userJsObject = sessionStorage.setItem('user', JSON.stringify(response.data.user));


            localStorage.setItem('token', response.data.token); // Store JWT token
            alert("Login successful");
            setLoginEmail("");
            setLoginPassword("");
            navigate("/home");
        } catch (error) {
            setLoginError("Error logging in. Please check your credentials.");
        }
    };

    return (
        <div>
            <section className="h-10 gradient-form" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                        <div className="card-body p-md-5 mx-md-4">
                                            <div className="text-center">
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                    style={{ width: '185px' }} alt="logo" />
                                                <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                                            </div>

                                            <form onSubmit={isSignUp ? handleSignUpSubmit : handleLoginSubmit}>
                                                {isSignUp ? (
                                                    <>
                                                        <p>Please create an account</p>
                                                        <div className="form-outline mb-4">
                                                            <input type="text" id="formName" className="form-control"
                                                                placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                                            <label className="form-label" htmlFor="formName">Name</label>
                                                        </div>

                                                        <div className="form-outline mb-4">
                                                            <input type="email" id="formEmail" className="form-control"
                                                                placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                            <label className="form-label" htmlFor="formEmail">Email</label>
                                                        </div>

                                                        <div className="form-outline mb-4">
                                                            <input type="password" id="formPassword" className="form-control"
                                                                placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                            <label className="form-label" htmlFor="formPassword">Password</label>
                                                        </div>

                                                        {signUpError && <p className="text-danger">{signUpError}</p>}
                                                    </>
                                                ) : (
                                                    <>
                                                        <p>Please login to your account</p>
                                                        <div className="form-outline mb-4">
                                                            <input type="email" id="formLoginEmail" className="form-control"
                                                                placeholder="Email address" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                                                            <label className="form-label" htmlFor="formLoginEmail">Email</label>
                                                        </div>

                                                        <div className="form-outline mb-4">
                                                            <input type="password" id="formLoginPassword" className="form-control"
                                                                placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                                                            <label className="form-label" htmlFor="formLoginPassword">Password</label>
                                                        </div>

                                                        {loginError && <p className="text-danger">{loginError}</p>}
                                                    </>
                                                )}

                                                <div className="text-center pt-1 mb-5 pb-1">
                                                    <button type="submit" className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">
                                                        {isSignUp ? 'Sign Up' : 'Log In'}
                                                    </button>
                                                    {!isSignUp ? (
                                                        <a className="text-muted" href="#!" onClick={handleSignUpClick}>Don't have an account? Create new</a>
                                                    ) : (
                                                        <a className="text-muted" href="#!" onClick={handleSignInClick}>Already have an account? Log In</a>
                                                    )}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                            <h4 className="mb-4">We are more than just a company</h4>
                                            <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                                
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    );
};

export default Login;
