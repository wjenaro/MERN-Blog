import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

/**
 * Renders a Bootstrap Navbar component with some text and a link.
 * @returns {JSX.Element} The rendered Navbar component.
 */
function Header() {
  return (
    <Navbar bg="body-tertiary">
      <Container>
        <Navbar.Brand href="/">Blog</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className='p-3'>
    <a href="/login" className="btn p-2 btn-primary">Login</a>
  
  {' | '}
  <a href='/logout' className='btn p-2 btn-danger'>Logout</a>
</Navbar.Text>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;