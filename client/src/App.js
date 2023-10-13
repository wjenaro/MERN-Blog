import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import {  Routes, Route } from "react-router-dom";
import Login from './LoginPage';
import Post from './Post';
import Register from './Register';
import {UserContextProvider} from './UserContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';


/**
 * Renders the main structure of a web page.
 * @returns {JSX.Element} The JSX code representing the web page structure.
 */
function App() {
  const [posts, setPosts] = useState([]);
  const serverUrl = 'https://mern-blog-hazel.vercel.app';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${serverUrl}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContextProvider>
      
 <Routes>
        <Route index element={
            <main>
                <Header />
                <Post posts={posts} /> 
             
                <Footer />
            </main>

        }/>
        <Route path='/login' element={
          <Login />
        }/>
           <Route path='/register' element={
            <Register />
        }/>
        <Route path='/create' element={
          <CreatePost />

        }/>
        <Route path='/post/:id' element={
          <PostPage />

        }/>
        <Route path='/edit/:id' element={
          <EditPost />

        }/>
     

      </Routes>
  
    </UserContextProvider>
   
     
     
 
  );
}

export default App;

