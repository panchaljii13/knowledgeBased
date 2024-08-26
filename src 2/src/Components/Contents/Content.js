import React from "react";
import { useNavigate } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import "./Content.css";

// Initialization for ES Users
// import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import { useState } from 'react';

// initMDB({ Dropdown, Collapse });

const Content = () => {
    const navigate = useNavigate();

    // comments

    
        const [comments, setComments] = useState([]);
        const [newComment, setNewComment] = useState('');
        const [showComments, setShowComments] = useState(true); // New state for toggling comments visibility
    
        const handleCommentChange = (e) => {
            setNewComment(e.target.value);
        };
    
        const handleCommentSubmit = (e) => {
            e.preventDefault();
            if (newComment.trim()) {
                setComments([
                    ...comments,
                    { text: newComment, likes: 0 }
                ]);
                setNewComment('');
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

        // LikeButton
        const [likes, setLikes] = useState(0);
        const [liked, setLiked] = useState(false);
    
        const handleLikeButton = () => {
            if (liked) {
                setLikes(likes - 1);
            } else {
                setLikes(likes + 1);
            }
            setLiked(!liked);
        };

   

    return (
    <div id="contentbg">
      <div className="container-xxl py-5" >
            <div className="container" >
                <div className="row g-5">
                    <div className="col-lg-5 d-flex flex-column">
                        <img 
                            className="img-fluid rounded w-70 align-self-end" 
                            src="dhoni.png" 
                            alt="About Us Image 1" 
                        />
                        {/* <img 
                            className="img-fluid rounded w-50 bg-white pt-3 pe-3" 
                            src="tech.jpg" 
                            alt="About Us Image 2" 
                            style={{ marginTop: '-25%' }} 
                        /> */}
                    </div>
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                        <p className="d-inline-block  py-1 px-1" id="Titlefont">Title</p>
                        <h1 className="mb-4" id="Title">Why You Should Trust Us? Get to Know About Us!</h1>
                        <p id="Article">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet.</p>
                        <p className="mb-4" id="Article">Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet est diam rebum amet diam ipsum. Clita clita labore, dolor duo nonumy clita sit at, sed sit sanctus dolor eos.</p>
                        {/* <a className="btn btn-primary rounded-pill py-3 px-5 mt-3" href="#">Read More</a> */}
                        {/* comemtsssss */}
                        <div>
                            {/* Likebutton */}
                            <div className="d-flex align-items-center">
            <button 
                className={`btn ${liked ? 'btn-primary' : 'btn-outline-primary'} btn-sm`} 
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
        </div>
    </div>
    );
};

export default Content;
