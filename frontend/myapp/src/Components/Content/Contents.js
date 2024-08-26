import React, { useEffect, useState } from "react";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import "./Contents.css";
import { useNavigate } from 'react-router-dom';

const Content = () => {
    const [articalList, setArticalList] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(true);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [UserID, setUserID] = useState(null); // or appropriate initial value
const [ArticleID, setArticleID] = useState(null); // or appropriate initial value


    // const [UserID, setUserID] = useState(''); // Example user ID state
    // const [ArticleID, setArticleID] = useState(''); // Example article ID state
    const navigate = useNavigate();

    useEffect(() => {
        const userID = sessionStorage.getItem('UserID');
        setUserID(userID);
        console.log('UserID',userID);

        const getArtical = async () => {
            try {
                const response = await axios.get('http://localhost:8080/article/view');
                setArticalList(response.data.data);
                // setComments(response.data.data.comments)
            } catch (error) {
                console.log('Error fetching articles:', error);
            }
        };
        getArtical();
    }, []);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
    
        // Check if `newComment`, `UserID`, and `ArticleID` are present
        if (newComment.trim() && UserID && ArticleID) {
            try {
                const response = await axios.post('http://localhost:8080/comments/add', {
                    feedback: newComment,
                    UserID,
                    ArticleID
                });
                console.log(response)

    
                if (response.data.success) {
                    setComments([
                        ...comments,
                        { text: newComment, likes: 0 }
                    ]);
                    setNewComment('');
                }
            } catch (error) {
                console.error('Error adding comment:', error);
                // Optionally show an error message to the user
            }
        } else {
            console.error('Comment, UserID, or ArticleID is missing.');
            // Show a user-friendly error message
            
            alert('Please fill in all required fields.');
        }
    };

    const handleLike = (index) => {
        const updatedComments = comments.map((comment, i) =>
            i === index ? { ...comment, likes: comment.likes + 1 } : comment
        );
        setComments(updatedComments);
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

    console.log('list', articalList);

    return (
        <div id="contentbg">
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        {articalList.map((article, index) => (
                            <div key={index} className="col-12 mb-4">
                                <div className="row">
                                    {/* Image section */}
                                    <div className="col-md-6 col-12 mb-4">
                                        <img
                                            className="img-fluid rounded w-100"
                                            src={article.image || "OIP1.png"} // Use article.image if available, otherwise default image
                                            alt={`Article Image ${index + 1}`}
                                        />
                                    </div>
                                    {/* Content section */}
                                    <div className="col-md-6 col-12">
                                        <div className="d-flex flex-column">
                                            <p className="d-inline-block py-1 px-1" id="Titlefont">Title</p>
                                            <h1 className="mb-4" id="Title">{article.title}</h1>
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
                                            </div>

                                            <div className="container mt-4">
                                                {/* Comment Form */}
                                                <form onSubmit={handleCommentSubmit} className="mb-4">
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
                                                        {comments.length > 0 ? (
                                                            comments.map((comment, index) => (
                                                                <div key={index} className="list-group-item d-flex justify-content-between align-items-start">
                                                                    <div className="ms-2 me-auto">
                                                                        <div className="fw-bold">User</div>
                                                                        {comment.text}
                                                                    </div>
                                                                    <button
                                                                        className="btn btn-outline-primary btn-sm"
                                                                        onClick={() => handleLike(index)}
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;
