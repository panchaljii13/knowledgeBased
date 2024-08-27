import React, { useState, useEffect } from "react";
import "./AddContent.css";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';

const UpdateContent = () => {
    const [newArticle, setNewArticle] = useState({ title: '', content: '', CategoryID: null, ArticleID: null });
    const navigate = useNavigate();

    // For getting the article data from location state
    const { state: article } = useLocation();
    const fullArticle = article.article;
    console.log("i a,m full article",fullArticle);

    // Initialize newArticle with existing article data
    useEffect(() => {
        if (fullArticle) {
            setNewArticle({
                title: fullArticle.title || '',
                content: fullArticle.content || '',
                CategoryID: fullArticle.CategoryID || null,
                ArticleID: fullArticle.ArticleID || null
            });
        }
    }, [fullArticle]);

    // Handle changes in text inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewArticle({
            ...newArticle,
            [name]: value
        });
    };

    // Handle changes in article type selection
    const handleSelectChange = (e) => {
        const value = e.target.value;
        setNewArticle({
            ...newArticle,
            CategoryID: parseInt(value) // Convert value to integer
        });
    };

    // Get the user ID for adding the article
    const userJsonObj = sessionStorage.getItem('user');
    const UserID = JSON.parse(userJsonObj).UserID;

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newArticle.title && newArticle.content && newArticle.CategoryID && newArticle.ArticleID) {
            console.log(newArticle.title, newArticle.content, newArticle.ArticleID, newArticle.CategoryID);

    
            try {
                const response = await axios.put('http://localhost:8080/article/update', {
                    title: newArticle.title,
                    content: newArticle.content,
                    ArticleID: newArticle.ArticleID,
                    CategoryID: newArticle.CategoryID
                }, {
                    headers: {
                        'Content-Type': 'application/json'  // Updated to application/json
                    }
                });
    
                if (response.status === 200) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Article updated successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    navigate("/home");
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update article.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                console.error('Error updating article:', error);
            }
        } else {
            Swal.fire({
                title: 'Warning!',
                text: 'Please fill in all required fields.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }
    };
    

    const backtocontent = () => {
        navigate("/home");
    };

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-6">
                        <h1 className="h1article">Update Article</h1>
                        <form onSubmit={handleSubmit} className="mb-4">
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formcontrocontent"
                                    name="title"
                                    value={newArticle.title}
                                    onChange={handleChange}
                                    placeholder="Title"
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <textarea
                                    className="form-control"
                                    id="formcontrocontent"
                                    name="content"
                                    rows="5"
                                    value={newArticle.content}
                                    onChange={handleChange}
                                    placeholder="Content"
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <select
                                    className="form-control"
                                    name="CategoryID"
                                    value={newArticle.CategoryID || ''}
                                    onChange={handleSelectChange}
                                    required
                                >
                                    <option value="" disabled>Select Article Type</option>
                                    <option value="1">Health & Wellness</option>
                                    <option value="2">Education</option>
                                    <option value="3">Technology</option>
                                    <option value="4">Finance</option>
                                    <option value="5">Lifestyle</option>
                                    <option value="6">Entertainment</option>
                                    <option value="7">Business</option>
                                    <option value="8">Politics</option>
                                    <option value="9">Environment</option>
                                    <option value="10">Food & Drink</option>
                                    <option value="11">Sports</option>
                                    <option value="12">Culture</option>
                                    <option value="13">History</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Update Article</button>
                            <button type="button" className="btn btn-success" onClick={backtocontent}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateContent;
// Naming conventions make programs more understandable by making them easier to read.