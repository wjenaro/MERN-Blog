import React, { useEffect, useState } from 'react';
import { Container, Form, FormGroup } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Footer from '../Footer';
import Header from '../Header';

/**
 * Renders a form to edit a blog post.
 * @returns {JSX.Element} The JSX element representing the form to edit a blog post.
 */
export default function EditPost() {
  const serverUrl = process.env.SERVER_URL || 'http://localhost:4000';

  const { id } = useParams();
 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`${serverUrl}/posts/${id}`);
        console.log('Response:', response); // Log the response
        const postInfo = await response.json();
        setTitle(postInfo.title);
        setContent(postInfo.content);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [id]);

  const updatePost = async (ev) => {
    ev.preventDefault();

    const data = new FormData();
    data.append('title', title);
    data.append('content', content);
    data.append('id', id);

    if (files && files[0]) {
      data.append('file', files[0]);
    }

    try {
      const response = await fetch(`${serverUrl}/posts/${id}`, {
        method: 'PUT',
        body: data,
        credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (redirect) {
    return <Navigate to={`/`} />;
  }

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { header: '3' }, { header: '4' }, { header: '5' }, { header: '6' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
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
              onChange={(ev) => setTitle(ev.target.value)}
            />
          </Form.Group>
          <FormGroup>
            <Form.Label>Content:</Form.Label>
            <ReactQuill
              theme="snow"
              style={{ height: "400px", marginBottom: "50px" }}
              modules={modules}
              formats={formats}
              onChange={setContent}
              value={content}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Image Upload:</Form.Label>
            <Form.Control
              type="file"
              onChange={(ev) => setFiles(ev.target.files)}
            />
          </FormGroup>
          <button className='btn-edit' type="submit">Update post</button>
        </Form>
      </Container>
      <Footer />
    </main>
  );
}
