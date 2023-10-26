import React, { useEffect, useContext } from 'react'; // Import useContext instead of useState
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';


/**
 * Renders a Bootstrap Navbar component with a brand link, toggle button, and login/registration buttons.
 * @returns {JSX.Element} The rendered Navbar component.
 */
function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext); // Use useContext instead of UserContext
  //const serverUrl = 'https://mern-blog-hazel.vercel.app';
  const serverUrl = process.env.SERVER_URL || 'http://localhost:4000';
  const url_ = 'http://localhost:3000';

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${serverUrl}/profile`, {
          credentials: 'include'
        });
        const userData = await response.json(); // Use userData instead of userInfo
        setUserInfo(userData); // Set the user data in the context
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [setUserInfo]); // Add setUserInfo as a dependency

  function logout() {
    fetch(`${serverUrl}/logout`, {
      credentials: 'include',
      method: 'POST'
    })
      .then(() => setUserInfo(null)) // Set user info to null after logout
      .catch(error => console.error('Error logging out:', error));
  }

  const username = userInfo?.username;

  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="/"><img src={`${url_}/logo.png`} alt='Cat Chronicles Blog'></img></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="p-3">
            {username ? (
              <>
                <Link to="/create">Create Post</Link>
                {' | '}
                <a onClick={logout} href="/">Logout</a> {/* Include href attribute */}
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">Login</Link> {/* Use Link for routing */}
                {' | '}
                <Link to="/register" className="btn btn-danger">Register</Link> {/* Use Link for routing */}
              </>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
