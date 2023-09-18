import { Col, Container, Row, Form, Button } from "react-bootstrap";

function LogoutForm(){
    return(
        <Container>
            <Row>
                <Col>
                </Col>
                <Col>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter your Email" />
                    </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
                </Col>
            </Row>
        </Container>
    )

}
export default LogoutForm;