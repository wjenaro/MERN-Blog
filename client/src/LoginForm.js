import React, { useState } from 'react'; // Import React
import { Col, Container, Row, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate } from 'react-router-dom';

/**
 * Renders a login form component.
 * @returns {JSX.Element} Login form component.
 */
function BasicLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const serverUrl = process.env.SERVER_URL || 'http://localhost:4000';

  /**
   * Handles the form submission and sends a POST request to the login endpoint.
   * @param {Event} ev - Form submission event.
   */
  async function login(ev) {
    ev.preventDefault();
    setSuccessMessage(''); // Clear previous messages
    setErrorMessage('');
    try {
      const response = await fetch(`${serverUrl}/auth/login`, {
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
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed.');
      }
    } catch (error) {
      // Handle network error
      setErrorMessage('An error occurred during login.');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <Container>
      <Row>
        <Col>
          <div>
            {/* You can add additional content here if needed */}
          </div>
        </Col>
        <Col>
          <Form onSubmit={login}>
            {successMessage && (
              <Alert variant="success">
                {successMessage}
              </Alert>
            )}
            {errorMessage && (
              <Alert variant="danger">
                {errorMessage}
              </Alert>
            )}
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
