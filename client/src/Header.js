import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


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
  <a href='/resgister' className='btn p-2 btn-danger'>Register</a>
</Navbar.Text>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;