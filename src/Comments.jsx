// CommentSectionWithForm.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types'; 

const Comments = () => {
  const [comments, setComments] = useState([]);

  const addComment = (comment) => {
    // Add the comment to the comments array
    setComments((prevComments) => [...prevComments, comment]);
    // Optionally, you can update your backend or storage solution here
  };

  const CommentForm = ({ addComment }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      // Add the comment to the parent component using the addComment function
      addComment(comment);
      // Clear the comment input
      setComment('');
    };

    

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">Add a Comment:</label>
        <textarea
          id="comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    );
  };

  return (
    <div>
      <h3>Comments</h3>
      {/* Display existing comments */}
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      {/* Display the comment form */}
      <CommentForm addComment={addComment} />
    </div>
  );
};

Comments.propTypes = {
    addComment: PropTypes.string.isRequired,

  };
export default Comments;
