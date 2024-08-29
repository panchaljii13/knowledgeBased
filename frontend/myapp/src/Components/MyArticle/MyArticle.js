import React, { useEffect, useState } from "react";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const MyArticles = () => {
    const [articleList, setArticleList] = useState([]);
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(true);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedContent, setUpdatedContent] = useState('');

    const navigate = useNavigate();
    const userjsonObj = sessionStorage.getItem('user');
    const userId = userjsonObj ? JSON.parse(userjsonObj).UserID : null;

    // Fetch articles and comments
    useEffect(() => {
        const getArticles = async () => {
            if (!userId) {
                console.error('UserID is missing');
                return;
            }

            try {
                const response = await axios.post('http://localhost:8080/user/getarticlebyuserid', { UserID: userId });
                console.log("Fetched articles:", response.data);

                if (response.data.success) {
                    setArticleList(response.data.data);
                    console.log("+++++++++++++++++++++++++++++++++++++");
                    console.log(response.data.data)
                } else {
                    console.error('Failed to fetch articles:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        getArticles();
    }, [userId]);

    // Delete an article
    const deleteArticle = async (article) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it'
            });

            if (result.isConfirmed) {
                const response = await axios.delete('http://localhost:8080/article/delete', {
                    data: { ArticleID: article.ArticleID }
                });

                if (response.status === 200) {
                    Swal.fire('Deleted!', 'Your article has been deleted.', 'success');
                    setArticleList(articleList.filter((item) => item.ArticleID !== article.ArticleID));
                } else {
                    Swal.fire('Error!', 'Failed to delete the article.', 'error');
                }
            }
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };

    // Post a new comment
    const postComment = async (e, article) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/comments/add', {
                UserID: userId,
                ArticleID: article.ArticleID,
                feedback: newComment
            });

            if (response.data.success) {
                setComments((prev) => ({
                    ...prev,
                    [article.ArticleID]: [
                        ...(prev[article.ArticleID] || []),
                        { text: newComment, likes: 0 }
                    ]
                }));
                setNewComment('');
            } else {
                console.error('Failed to post comment:', response.data.error);
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    // Handle comment input change
    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    // Handle like on comments
    const handleCommentLike = (articleId, index) => {
        setComments((prev) => ({
            ...prev,
            [articleId]: prev[articleId].map((comment, i) =>
                i === index ? { ...comment, likes: comment.likes + 1 } : comment
            )
        }));
    };

    // Toggle comments visibility
    const toggleComments = () => {
        setShowComments(!showComments);
    };

    // Handle like button on article
    const handleLikeButton = (article) => {
        setLikes((prev) => prev + (liked ? -1 : 1));
        setLiked(!liked);
    };

    // Handle article edit click
    const handleEditClick = (article) => {
        setSelectedArticle(article);
        setUpdatedTitle(article.title);
        setUpdatedContent(article.content);
        setEditMode(true);
    };

    // Update article
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (!selectedArticle) return;

        try {
            const response = await axios.put('http://localhost:8080/article/update', {
                ArticleID: selectedArticle.ArticleID,
                title: updatedTitle,
                content: updatedContent
            });

            if (response.data.success) {
                Swal.fire('Updated!', 'Your article has been updated.', 'success');
                setArticleList(articleList.map(article =>
                    article.ArticleID === selectedArticle.ArticleID
                        ? { ...article, title: updatedTitle, content: updatedContent }
                        : article
                ));
                setEditMode(false);
            } else {
                console.error('Failed to update article:', response.data.error);
            }
        } catch (error) {
            console.error('Error updating article:', error);
        }
    };

    // Render
    return (
        <div id="contentbg">
            <h2>hii</h2>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-12 mb-4">
                            <div className="row">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                    className="profileimg"
                                    height="25"
                                    alt="Profile"
                                    loading="lazy"
                                />
                                <h1>i am user</h1>
                                <div className="col-md-6 col-12 mb-4">
                                    <img
                                        className="img-fluid rounded w-100"
                                        src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                        alt="Default Image"
                                    />
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="d-flex flex-column">
                                        <p className="d-inline-block py-1 px-1" id="Categoryfont">Category</p>
                                        <h1 className="mb-4" id="Category">
                                            {articleList.category ? articleList.category.categoryname : 'Unknown Category'}
                                        </h1>
                                        <h2>{articleList.title}</h2>
                                        <p id="Article">{articleList.content}</p>
                                        <div className="d-flex align-items-center mb-4">
                                        </div>
                                        {/* <form className="mb-4" onSubmit={(e) => postComment(e, article)}>
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
                                        </form> */}
                                        {/* {showComments && (
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
                                                                onClick={() => handleCommentLike(article.ArticleID, index)}
                                                            >
                                                                <i className="fas fa-thumbs-up"></i> {comment.likes}
                                                            </button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-muted">No comments yet.</p>
                                                )}
                                            </div>
                                        )} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Update Article Modal
            {editMode && selectedArticle && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} aria-modal="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Article</h5>
                                <button type="button" className="btn-close" onClick={() => setEditMode(false)}></button>
                            </div>
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

export default MyArticles;
