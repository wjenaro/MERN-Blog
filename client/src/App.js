import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {  Routes, Route } from "react-router-dom";
import Login from './LoginPage';
import Post from './Post';
import Register from './Register';
import {UserContextProvider} from './UserContext';


/**
 * Renders the main structure of a web page.
 * @returns {JSX.Element} The JSX code representing the web page structure.
 */
function App() {
  return (
    <UserContextProvider>
      
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
  
    </UserContextProvider>
   
     
     
 
  );
}

export default App;

