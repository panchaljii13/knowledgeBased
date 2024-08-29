import React, { useEffect, useState } from "react";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import "./Contents.css";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const Content = () => {
    const [articleList, setArticleList] = useState([]);
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(true);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [editMode, setEditMode] = useState(false); // Track edit mode
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedContent, setUpdatedContent] = useState('');

    const navigate = useNavigate();
    const userjsonObj = sessionStorage.getItem('user');
    const userId = JSON.parse(userjsonObj).UserID;


    // for delete the article 
    const deleteArticalFun = async (article) => {
        console.log('i am article', article);
        try {
            const result = Swal.fire({
                title: 'Are you sure?',
                text: 'This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it'
            })

            if ((await result).isConfirmed) {
                console.log(article.ArticleID);
                const response = await axios.delete('http://localhost:8080/article/delete', { data: {ArticleID: article.ArticleID }});
                console.log(response);
                if (response.status === 201) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Your operation was successful.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    const newUpdateList = articleList.filter((articleee) => {
                        return (articleee.ArticleID !== article.ArticleID);
                    })
                    setArticleList(newUpdateList);
                } else if (response.status === 404) {
                    Swal.fire({
                        title: 'Alert!',
                        text: 'something went wrong...',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, proceed',
                        cancelButtonText: 'No, cancel'
                    })
                }
            }


        } catch (error) {
            console.log('internal server error', error);
        }
    }


    // Fetch articles and comments
    useEffect(() => {
        const getArticles = async () => {
            try {
                const response = await axios.get('http://localhost:8080/article/view');
                setArticleList(response.data.data);
                console.log("response----------------",response.data.data)
            } catch (error) {
                console.log('Error fetching articles:', error);
            }
            console.log("aerticle[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]");

        };
        getArticles();
    }, []);

    const postCommentFun = async (e, article) => {
        e.preventDefault();
        const commentText = newComment;
        try {
            const response = await axios.post('http://localhost:8080/comments/add', {
                UserID: userId,
                ArticleID: article.ArticleID,
                feedback: commentText
            });
            setComments(prevComments => ({
                ...prevComments,
                [article.ArticleID]: [...(prevComments[article.ArticleID] || []), { text: commentText, likes: 0 }]
            }));
            setNewComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleLike = (articleId, index) => {
        const updatedComments = (comments[articleId] || []).map((comment, i) =>
            i === index ? { ...comment, likes: comment.likes + 1 } : comment
        );
        setComments(prevComments => ({
            ...prevComments,
            [articleId]: updatedComments
        }));
    };

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleLikeButton = () => {
        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setLiked(!liked);
    };

    const handleEditClick = (article) => {
        setSelectedArticle(article);
        setUpdatedTitle(article.title);
        setUpdatedContent(article.content);
        setEditMode(true);

        navigate('/updateContent', { state: { article } })
    };

   

    return (
        <div id="contentbg">
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        {articleList.map((article, index) => (
                            <div key={index} className="col-12 mb-4">
                                <div className="row">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                    className="profileimg"
                                    height="25"
                                    alt="Profile"
                                    loading="lazy"
                                />
                                    <h1>
                                    {article.user ? article.user.name : 'Unknown Category'}

                                    </h1>
                                    {/* Image section */}
                                    
                                    <div className="col-md-6 col-12 mb-4">
                  {Array.isArray(article.AddImages) && article.AddImages.length > 0 ? (
                    article.AddImages.map((imageUrl, imageIndex) => (
                      <img
                        key={imageIndex}
                        className="img-fluid rounded w-100"
                        src={`http://localhost:8080/${imageUrl}`} // Adjust URL as needed
                        alt={`Article Image ${imageIndex + 1}`}
                      />
                    ))
                  ) : (
                    <img
                      className="img-fluid rounded w-100"
                      src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                      alt="Default Image"
                    />
                  )}
                </div>
                                    {/* Content section */}
                                  <div className="col-md-6 col-12">
                                    <div className="d-flex flex-column">
                                    <p className="d-inline-block py-1 px-1" id="Categoryfont">Category</p>
                                    <h1 className="mb-4" id="Category">
                                        {article.category ? article.category.categoryname : 'Unknown Category'}
                                    </h1> {/* Display category name */}
                                    <h2>{article.title}</h2>
                                    <p id="Article">{article.content}</p>
                                            <div className="d-flex align-items-center mb-4">
                                                {/* Like button */}
                                                <button
                                                    className={`btn ${liked ? 'btn-primary' : 'btn-outline-primary'} btn-sm me-2`}
                                                    onClick={handleLikeButton}
                                                >
                                                    <i className={`fas fa-thumbs-up me-2 ${liked ? 'text-white' : 'text-primary'}`}></i>
                                                    {likes}
                                                </button>
                                                {/* Edit button */}
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => handleEditClick(article)}
                                                >
                                                    <i className="fas fa-edit"></i> Edit
                                                </button>
                                                <button className="btn btn-outline-danger" onClick={() => { deleteArticalFun(article) }}> delete</button>
                                            </div>

                                            {/* Comment Form */}
                                            <form className="mb-4" onSubmit={(e) => postCommentFun(e, article)}>
                                                <div className="form-group">
                                                    <textarea
                                                        className="form-control"
                                                        rows="3"
                                                        value={newComment}
                                                        onChange={handleCommentChange}
                                                        placeholder="Write a comment..."
                                                        required
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-primary mt-2">Post Comment</button>
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary mt-2 ms-2"
                                                    onClick={toggleComments}
                                                >
                                                    {showComments ? 'Hide Comments' : 'Show Comments'}
                                                </button>
                                            </form>

                                            {/* Comments List */}
                                            {showComments && (
                                                <div className="list-group">
                                                    {comments[article.ArticleID] && comments[article.ArticleID].length > 0 ? (
                                                        comments[article.ArticleID].map((comment, index) => (
                                                            <div key={index} className="list-group-item d-flex justify-content-between align-items-start">
                                                                <div className="ms-2 me-auto">
                                                                    <div className="fw-bold">User</div>
                                                                    {comment.text}
                                                                </div>
                                                                <button
                                                                    className="btn btn-outline-primary btn-sm"
                                                                    onClick={() => handleLike(article.ArticleID, index)}
                                                                >
                                                                    <i className="fas fa-thumbs-up"></i> {comment.likes}
                                                                </button>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-muted">No comments yet.</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Update Article Modal */}
            {/* {editMode && selectedArticle && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} aria-modal="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Article</h5>
                                <button type="button" className="btn-close" onClick={() => setEditMode(false)}></button>
                            </div>+
                            <div className="modal-body">
                                <form onSubmit={handleUpdateSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="updateTitle" className="form-label">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="updateTitle"
                                            value={updatedTitle}
                                            onChange={(e) => setUpdatedTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="updateContent" className="form-label">Content</label>
                                        <textarea
                                            className="form-control"
                                            id="updateContent"
                                            rows="5"
                                            value={updatedContent}
                                            onChange={(e) => setUpdatedContent(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Update Article</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default Content;
