import React, { useState } from 'react'; // Import React
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Navigate} from 'react-router-dom'


/**
 * Renders a login form component.
 * @returns {JSX.Element} Login form component.
 */
function BasicLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect]=useState(false);

  /**
   * Handles the form submission and sends a POST request to the login endpoint.
   * @param {Event} ev - Form submission event.
   */
  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        // Handle successful login
        setRedirect(true);
      } else {
        // Handle login error
        alert("Login Failed")
      }
    } catch (error) {
      // Handle network error
      
    }
  }
if(redirect){
  return <Navigate to={'/'} />
}
  return (
    <Container>
      <Row>
        <Col>
          <div>
            <img src="#" alt="Placeholder for your image" />
          </div>
        </Col>
        <Col>
          <Form onSubmit={login}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default BasicLogin;


