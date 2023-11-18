import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePost from './CreatePost'
import ReadPosts from './ReadPosts'
import EditPost from './EditPost';
import './App.css'
import DetailCard from './DetailCard';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<ReadPosts />} />
        <Route path="/create" element={<CreatePost />} />  
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/details/:id/*" element={<DetailCard/>}/>
        
      </Routes>
      
    </div>
  );
}

export default App;