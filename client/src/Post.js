import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

function ContainerExample({ posts }) {
  
  return (
    <Container>
       {posts.map((post) => (
        <Row key={post._id}>
          <Col xs lg="3">
            <img
              src={post.imageFile} // Assuming the imageFile contains the image URL
              className='post-image'
              alt='Good picture'
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            ></img>
          </Col>
          <Col>
            <h1 className='text-primary font-weight-bold'>{post.title}</h1>
            <p>{post.content}</p>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default ContainerExample;
