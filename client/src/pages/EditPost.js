import React, { useEffect, useState } from 'react';
import { Container, Form, FormGroup } from 'react-bootstrap';
import Footer from '../Footer';
import Header from '../Header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';

/**
 * Renders an "Edit" heading.
 * @returns {JSX.Element} The JSX element representing the "Edit" heading.
 */
export default function EditPost() {
  const serverUrl = 'https://mern-blog-api-three.vercel.app';
        const {id} = useParams();
        const [title,setTitle] = useState('');
        
        const [content,setContent] = useState('');
        const [files, setFiles] = useState('');
        const [redirect,setRedirect] = useState(false);
      
        useEffect(() => {
          fetch(`${serverUrl}/`+id)
            .then(response => {
              response.json().then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                
              });
            });
        }, []);
      
        async function updatePost(ev) {
          ev.preventDefault();
          const data = new FormData();
          data.set('title', title);
          
          data.set('content', content);
          data.set('id', id);
          if (files?.[0]) {
            data.set('file', files?.[0]);
          }
          const response = await fetch(`${serverUrl}/post`, {
            method: 'PUT',
            body: data,
            credentials: 'include',
          });
          if (response.ok) {
            setRedirect(true);
          }
        }
      
        if (redirect) {
          return <Navigate to={'/post/'+id} />
        }



    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
          ['link', 'image'],
          ['clean']
        ],
      };
      const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ];
  return (
    <main>
      <Header />
      <Container>
        <Form onSubmit={updatePost}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control 
            type="text"
            value={title}
             onChange={ev => setTitle(ev.target.value)}
              />
          </Form.Group>
          <FormGroup>
            <Form.Label>
                Content:
            </Form.Label>
            <ReactQuill
              theme="snow"
              style={{ height: "400px", marginBottom: "50px" }}
              modules={modules}
              formats={formats}
              onChange={setContent} value={content}
             
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Image Upload: </Form.Label>
            <Form.Control
                type="file"
                onChange={ev => setFiles(ev.target.files)}
            />
            </FormGroup>
        
          <button className='btn-edit'>Update post</button>
        
        </Form>
        
      </Container>
      <Footer />
    </main>
  );
}
