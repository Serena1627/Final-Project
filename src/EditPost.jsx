import React from 'react';
import {useState} from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './client';
import './EditPost.css'

const EditPost = ({data}) => {
  const {id} = useParams();
  const [post, setPost] = useState({id, title: "", content: ""});

  const updatePost = async (event) => {
    event.preventDefault();
    await supabase
      .from('Posts')
      .update({ title: post.title, content: post.content})
      .eq('id', id);
    
    window.location = "/";

  }

  const deletePost = async (event) => {
    event.preventDefault();
    await supabase
      .from('Posts')
      .delete()
      .eq('id', id);

    window.location = "/";
  }



  const handleChange = (event) => {
      const {name, value} = event.target;
      setPost( (prev) => {
          return {
              ...prev,
              [name]:value,
          }
      })
  }

  return (
      <div>
          <form>
              <label htmlFor="title">Title</label> <br />
              <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
              <br/>

              <label htmlFor="content">Content</label><br />
              <input type="text" id="content" name="content" value={post.content} onChange={handleChange} /><br />
              <br/>

              <input type="submit" value="Submit" onClick={updatePost} />
              <button className="deleteButton" onClick={deletePost}>Delete</button>
          </form>
      </div>
  )
}

export default EditPost