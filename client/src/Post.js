import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { format } from 'date-fns';
import './App.css';
import { Link } from 'react-router-dom';

/**
 * Renders a container with rows and columns for each post in the `posts` array.
 * Each post is displayed with an image, title, author, date, and truncated content.
 *
 * @param {Object[]} posts - An array of post objects.
 * @returns {JSX.Element} - Rendered JSX code representing a container with rows and columns for each post.
 */
function ContainerExample({ posts }) {
  const serverUrl = 'http://localhost:4000';

  /**
   * Truncates the content if it exceeds the maximum length.
   *
   * @param {string} content - The content to be truncated.
   * @param {number} maxLength - The maximum length of the content.
   * @returns {string} - The truncated content.
   */
  function truncateContent(content, maxLength) {
    return content.length > maxLength ? `${content.substring(0, maxLength)}...` : content;
  }

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <Container>
      {posts.map((post) => {
        const formattedDate = new Date(post.updatedAt).toLocaleDateString(options);

        return (
          <Row key={post._id}>
            <Col xs lg="3">
              <Link to={`/post/${post._id}`}>
              <img
                src={`${serverUrl}/${post.imageFile}`}
                className='post-image'
                alt='Good picture'
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
              </Link>
            </Col>
            <Col>
             <Link to={`/post/${post._id}`}>
             <h1 className='text-primary font-weight-bold'>{post.title}</h1>
             </Link>
              <span className='font-weight-bold text-uppercase pr-4'><a className='text-decoration-none' href=''>{post.author.username}</a></span> <span> | </span>
              <time>{format(new Date(formattedDate), 'MM d /yyyy')}</time>
              <div dangerouslySetInnerHTML={{ __html: truncateContent(post.content, 500) }} /> 
              <Link to={`/post/${post._id}`}>
                <span>Read More...</span>
              </Link>
              <hr/>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
}

export default ContainerExample;
