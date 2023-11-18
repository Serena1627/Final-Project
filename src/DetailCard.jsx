import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Router, Routes, Route } from 'react-router-dom';
import './DetailCard.css'
import PropTypes from 'prop-types'; 
import { supabase } from './client';
import { formatDistanceToNow } from 'date-fns';
import Comments from './Comments';


const DetailCard = (props) =>  {
    const { id } = useParams();
    const [postDetails, setPostDetails] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);


    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };
    
    const handleCommentSubmit = (e) => {
        e.preventDefault();
    
        // Add the new comment to the comments array
        setComments((prevComments) => [...prevComments, comment]);
    
        // Clear the comment input
        setComment('');
    };


    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const { data, error } = await supabase
                    .from('Posts') // Replace 'Posts' with your actual table name
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    throw new Error('Failed to fetch post details');
                }

                setPostDetails(data);
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };

        fetchPostDetails();
  }, [id]);


  if (!postDetails) {
    return <div>Loading...</div>;
  }


  const createdTime = new Date(postDetails.created_at);
  const timeDifference = formatDistanceToNow(createdTime, { addSuffix: true });


  return (
    <div>
      <h2>Post #{id}</h2>
      <h3>{postDetails.title}</h3>
      <p>{postDetails.content}</p>
      <p>Created {timeDifference}</p>
      <div className="comment-section">
        <h2>Comments:</h2>
        <ul>
            {comments.map((c, index) => (
            <li key={index} className="comment-container">{c}</li>
            ))}
        </ul>

        <form onSubmit={handleCommentSubmit}>
            <label htmlFor="newComment"></label>
            <input
            type="text"
            id="newComment"
            value={comment}
            onChange={handleCommentChange}
            />
            <button type="submit">Submit Comment</button>
        </form>
      </div>
    
    </div>
  );
};

    

  export default DetailCard;