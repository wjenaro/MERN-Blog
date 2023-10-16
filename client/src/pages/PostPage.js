import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {format} from "date-fns";
import {UserContext} from "../UserContext";
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap'
import Header from "../Header";
import Footer from '../Footer';


export default function PostPage() {
  const [postInfo,setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
  const {id} = useParams();
  //const serverUrl = 'https://mern-blog-hazel.vercel.app';
  const serverUrl = process.env.SERVER_URL || 'https://mern-blog-api-hazel.vercel.app';
 
  const url_ = 'https://mern-blog-client-sigma.vercel.app';
  

  useEffect(() => {
    fetch(`${serverUrl}/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, []);

  if (!postInfo) return '';

  return (
    <main>
      <Header />
      <Container>
        <Row>
          <Col>
          <h1>{postInfo.title}</h1>
          <span className='font-weight-bold pr-4'>
          By <a href='#' className='capitalize-first text-decoration-none'>
                <span className='author-name'>@ 
                {postInfo.author.username}
                  </span>
              </a>
            </span>
            <span> | </span>
            <span>
              <time> {format(new Date(postInfo.createdAt), 'dd - mm- yyyy')}

              </time>
            </span>
            {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <span className="edit-button">
              Edit <img src={`${url_}/icons8-edit-16.png`} alt="edit"></img>
            </span>
     

          </Link>
        </div>
      )}
          </Col>
        </Row>
        <Row>
          <Col>
          <img
              src={`${serverUrl}/${postInfo.imageFile}`}
              alt='Parakeets on a Branch'
              fluid
              className="img-fluid"  
            
            />
      
          </Col>
        </Row>
        <Row>
          <Col>
         
          <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />

          </Col>
        </Row>



      </Container>
      <Footer />
    </main>
  );
}
