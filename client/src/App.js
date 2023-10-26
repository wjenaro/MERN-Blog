import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Login from './LoginPage';
import Post from './Post';
import Register from './Register';
import { UserContextProvider } from './UserContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';

const SERVER_URL = 'http://localhost:4000';

/**
 * Renders the main structure of a web page.
 * @returns {JSX.Element} The JSX code representing the web page structure.
 */
function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/posts`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const MainContent = () => (
    <main>
      <Header />
      <Post posts={posts} />
      <Footer />
    </main>
  );

  return (
    <UserContextProvider>
      <Routes>
        <Route index element={<MainContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
