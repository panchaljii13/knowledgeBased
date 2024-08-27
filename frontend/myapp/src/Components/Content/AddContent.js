import React, { useState } from "react";
import "./AddContent.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';


const Content = () => {
    const [articles, setArticles] = useState([]);
    const [newArticle, setNewArticle] = useState({ title: '', content: '', AddImages: null, CategoryID: null });
    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate();

    // Handle changes in text inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewArticle({
            ...newArticle,
            [name]: value
        });
    };

    // Handle changes in file input
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewArticle({
            ...newArticle,
            AddImages: file
        });
        setPreviewImage(URL.createObjectURL(file));
    };

    // Handle changes in article type selection
    const handleSelectChange = (e) => {
        const value = e.target.value;
        setNewArticle({
            ...newArticle,
            CategoryID: parseInt(value) // Convert value to integer
        });
    };

    // get the user id for add the article 
    const userJsonObj = sessionStorage.getItem('user');
    const UserID = JSON.parse(userJsonObj).UserID;   

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newArticle.title && newArticle.content && newArticle.AddImages && newArticle.CategoryID) {
            setArticles([...articles, newArticle]);
            setNewArticle({ title: '', content: '', AddImages: null, CategoryID: null });
            setPreviewImage(null);

            // Prepare FormData for file upload
            const formData = new FormData();
            formData.append('title', newArticle.title);
            formData.append('content', newArticle.content);
            formData.append('CategoryID', newArticle.CategoryID);
            formData.append('AddImages', newArticle.AddImages);
            formData.append('UserID', UserID)

            console.log(formData);

            try {
                const response = await axios.post('http://localhost:8080/article/add', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log("ii ammmmm  responc",response);
                if(response.status === 201){
                    Swal.fire({
                        title: 'Success!',
                        text: 'Article added successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    navigate("/home");
                }else if(response.status === 404){
                    Swal.fire({
                        title: 'Warning!',
                        text: 'Please fill in all required fields.',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add article.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                console.error('Error adding article:', error);
            }
        } else {
            
            alert('All fields are required.');
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
                        <h1 className="h1article">Add a New Article</h1>
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
                            <div className="form-group mb-5">
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
                                <input
                                    type="file"
                                    className="form-control"
                                    id="formcontrocontent"
                                    onChange={handleImageChange}
                                    accept="image/*"
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
                            {previewImage && (
                                <div className="mb-3">
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="img-fluid rounded"
                                        style={{ maxHeight: '200px' }}
                                    />
                                </div>
                            )}
                            <button type="submit" className="btn btn-primary">Add Article</button>
                            <button type="button" className="btn btn-success" onClick={backtocontent}>Cancel</button>
                        </form>
                    </div>

                    <div className="col-lg-6">
                        <h1>Your Articles</h1>
                        {articles.length > 0 ? (
                            <div className="list-group">
                                {articles.map((article, index) => (
                                    <div key={index} className="list-group-item mb-4" id="articleimg">
                                        <h5>{article.title}</h5>
                                        <p>{article.content}</p>
                                        <p><strong>Article ID:</strong> {article.CategoryID}</p>
                                        {article.AddImages && (
                                            <img
                                                src={URL.createObjectURL(article.AddImages)}
                                                alt={article.title}
                                                className="img-fluid rounded"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted">No articles yet. Start adding your content!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;
