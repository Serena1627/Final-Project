import React, { useState, useEffect } from 'react';
import './CreatePost.css';
import { supabase } from './client';

const CreatePost = () => {
  const [post, setPost] = useState({ title: "",  content: "" });

  useEffect(() => {
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const {data, error } = await supabase
      .from('Posts')
      .insert({
        title: post.title,
        content: post.content,
      });
    
      if (error) {
        console.error('Error inserting post:', error);
        // Handle error, show user a message, etc.
      } else {
        console.log('Post inserted successfully:', data);
        // Optionally, redirect the user
        window.location = "/";
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };
    



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label> <br />
        <input type="text" id="title" name="title" onChange={handleChange} /><br />
        <br/>

        <label htmlFor="content">Content</label><br />
        <input type="text" id="content" name="content" onChange={handleChange} /><br />
        <br/>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreatePost;
