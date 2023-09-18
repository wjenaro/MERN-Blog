import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './LoginPage';
import Logout from './LogoutPage';
import Post from './Post';

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
        <Route path='/logout' element={
          <Logout />
        }/>



      </Routes>
     
 
  );
}

export default App;

