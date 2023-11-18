import React, { useState, useEffect } from 'react';
import Card from './Card';
import './ReadPosts.css';
import { supabase } from './client';
import CreatePost from './CreatePost';
import { Link } from 'react-router-dom';

const ReadPosts = () => {
    const createPost = () => {
        <CreatePost/>
        console.log('Creating a new post!');
      };

    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('Posts')
                    .select();

                if (error) {
                    console.error('Error fetching posts:', error);
                } else {
                    setPosts(data);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
            }
        };

        fetchPosts();
    }, []); 
    
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const [countMap, setCountMap] = useState({}); // Map to store counts for each post

    const updateCount = (postId, newCount) => {
        setCountMap((prevCountMap) => ({
            ...prevCountMap,
            [postId]: newCount,
        }));
    };

    const sortPostsByVotes = () => {
        const sortedPosts = [...posts].sort((a, b) => (countMap[b.id] || 0) - (countMap[a.id] || 0));
        setPosts(sortedPosts);
    };

    const sortPostsByDate = () => {
        const sortedPosts = [...posts].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        setPosts(sortedPosts);
    };

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="ReadPosts">
            <div className='header'>
                <div className="title">Fitness Advice Column</div>
                <div>
                    <label htmlFor="search">Search by Title: </label>
                    <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div>
                    <button onClick={sortPostsByVotes}>Sort by Votes</button>
                    <button onClick={sortPostsByDate}>Sort by Date</button>
                </div>
            </div>
            <div>
                <Link to="/create">
                    <button className='create-post' onClick={createPost}>Create Post</button>
                </Link>
            </div>
            {
                filteredPosts && filteredPosts.length > 0 ?
                filteredPosts.map((post) => 
                    <Card key={`card-${post.id}`} id={post.id} title={post.title} content={post.content} created_at={post.created_at} updateCount={updateCount} />
                ) : <h2>{'No Challenges Yet 😞'}</h2>
            }
        </div>
  
    )
}

export default ReadPosts;