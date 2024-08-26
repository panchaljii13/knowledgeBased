import React, { useState } from "react";
import "./AddContent.css";
import { useNavigate } from 'react-router-dom';


const Content = () => {
    const [articles, setArticles] = useState([]);
    const [newArticle, setNewArticle] = useState({ title: '', content: '', image: null });
    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewArticle({
            ...newArticle,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewArticle({
            ...newArticle,
            image: file
        });
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newArticle.title && newArticle.content && newArticle.image) {
            setArticles([...articles, newArticle]);
            setNewArticle({ title: '', content: '', image: null });
            setPreviewImage(null);
        }
    };
    const backtocontent = () =>{
        navigate("/home");

    }

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-6">
                       
                        <h1 className=" h1article">Add a New Article</h1>
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
                                <input
                                    type="file"
                                    className="form-control"
                                    id="formcontrocontent"

                                    onChange={handleImageChange}
                                    accept="image/*"
                                    required
                                />
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
                            <button className="btn btn-success" onClick={backtocontent}>cancle</button>
                        </form>
                    </div>

                    <div className="col-lg-6">
                        <h1>Your Articles</h1>
                        {articles.length > 0 ? (
                            <div  className="list-group" >  
                                {articles.map((article, index) => (
                                    <div key={index} className="list-group-item mb-4"
                                    id="articleimg">
                                        <h5>{article.title}</h5>
                                        <p>{article.content}</p>
                                        {article.image && (
                                            <img 
                                                src={URL.createObjectURL(article.image)}
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
