import { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";

function LogoutForm(){
  const [username, setUsername]=useState('');
  const [password, setPassword]=useState('');
  const [email, setEmail]=useState('');
  function register(){
    
  }
    return(
        <Container>
            <Row>
                <Col>
                </Col>
                <Col>
                <Form onSubmit={register}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                     type="text" 
                     placeholder="Enter your Name"
                     value={username} 
                     onChange={ev=> setUsername(ev.target.value)}
                     />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Enter your Email"
                    value={email}
                    onChange={ev=> setEmail(ev.target.value)}
                    />
                    </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={ev=> setPassword(ev.target.value)}
                    />
                  </Form.Group>
                
                  <Button variant="primary" type="submit">
                    Register
                  </Button>
                </Form>
                </Col>
            </Row>
        </Container>
    )

}
export default LogoutForm;