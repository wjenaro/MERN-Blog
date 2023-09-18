import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './LoginPage';
import Post from './Post';
import Register from './RegisterPage';

/**
 * Renders the main structure of a web page.
 * @returns {JSX.Element} The JSX code representing the web page structure.
 */
function App() {
  return (
   
      <Routes>
        <Route index element={
            <main>
                <Header />
                <Post />
                <Post />
                <Footer />
            </main>

        }/>
        <Route path='/login' element={
          <Login />
        }/>
        <Route path='/register' element={
          <Register />
        }/>

      </Routes>
     
 
  );
}

export default App;

