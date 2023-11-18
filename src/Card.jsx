import React from 'react'
import { useState } from 'react'
import './Card.css'
import EditPost from './EditPost'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'; 
import { formatDistanceToNow } from 'date-fns';

const Card = (props) =>  {

  const editPost = () => {
    <EditPost/>
    console.log('Editing a post!');
  };

  const [count, setCount] = useState(0)
  const updateCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    props.updateCount(props.id, newCount); // Call the callback to update count in ReadPosts
  };

  const createdTime = new Date(props.created_at);
  const timeDifference = formatDistanceToNow(createdTime, { addSuffix: true });

  return (
      <div className="Card">
          <h2 className="title"><Link to={'details/'+ props.id}>{props.title}</Link></h2>
          <p>Created {timeDifference}</p>
          <Link to={'edit/'+ props.id}>
            <button onClick={editPost}>Edit Post</button>
          </Link>
          <button className="likes" onClick={updateCount}>👍 Likes: {count}</button>
      </div>
  );
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    created_at: PropTypes.object,
    updateCount: PropTypes.func.isRequired,
  };

export default Card;