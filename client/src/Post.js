import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

function ContainerExample() {
  return (
    <Container>
      <Row>
        <Col xs lg="3">
            <img src="https://techcrunch.com/wp-content/uploads/2023/09/bird-buddy-explore.jpeg?w=430&h=230&crop=1" className='post-image' alt='Good picture'
             style={{
                maxWidth: '100%', // Ensure the image doesn't exceed its container
                height: 'auto',   // Maintain the aspect ratio
                borderRadius: '8px', // Add rounded corners
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
              }}
            ></img>
        </Col>
        <Col>
          <h1 className='text-primary font-weight-bold'>
            Bird Buddy, the AI-powered bird feeder startup, now lets anyone use its app to birdwatch
          </h1>
          <p>Bird Buddy, the startup behind multiple AI-powered smart bird feeders, including the recently announced smart Hummingbird Feeder and Bird Bath, is today launching its latest product — and it&...</p>
        </Col>
      </Row>
    </Container>
  );
}

export default ContainerExample;
