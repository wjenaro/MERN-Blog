import React, { useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";

/**
 * Renders a form for user registration.
 * @returns {JSX.Element} The RegisterForm component.
 */
function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const serverUrl = process.env.SERVER_URL || 'http://localhost:4000';

  /**
   * Handles form submission.
   * @param {Event} ev - The form submission event.
   */
  async function register(ev) {
    ev.preventDefault();
    setSuccessMessage(""); // Clear previous messages
    setErrorMessage("");
    try {
      const response = await fetch(`${serverUrl}/users/register`, {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setSuccessMessage("Registration successful!");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Registration failed.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during registration.");
    }
  }

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <Form onSubmit={register}>
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
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Name"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterForm;
