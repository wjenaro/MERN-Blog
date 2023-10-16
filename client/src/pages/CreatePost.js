import 'react-quill/dist/quill.snow.css';
import React, { useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import Footer from "../Footer";
import Header from "../Header";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';


/**
 * Renders a form for creating a blog post.
 * @returns {JSX.Element} The rendered form for creating a blog post.
 */
export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [redirect, setRedirect]=useState(false);
  //const serverUrl = 'https://mern-blog-hazel.vercel.app';
  const serverUrl = process.env.SERVER_URL || 'https://mern-blog-api-hazel.vercel.app';
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (newValue) => {
    setContent(newValue);
  };

  const handleImageFileChange = (event) => {
    setImageFile( event.target.files[0]);
    
  };
  

  const handleSubmit = async (event) => {
    const formData = new FormData();
    formData.set('title', title);
    formData.set('content', content);
    formData.set('imageFile', imageFile);

    event.preventDefault();

    try {
        const response= await fetch(`${serverUrl}/cpost`,
        {
            method: "POST", 
            body: formData,
            credentials: 'include',
    
        });
        if (response.ok) {
            // Handle success
            setRedirect(true);
        } else {
            // Handle error
            alert("Post was not created due to some errors");
        }
        
    } catch (error) {
        
    }
      

  };
if(redirect){
  return <Navigate to='/' />
}
  return (
    <main>
      <Header />
      <h4 className="text-center">Create A Post</h4>
      <hr></hr>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
            />
          </FormGroup>
          <FormGroup style={{ height: "300px" }}>
            <Form.Label>Content:</Form.Label>
            <ReactQuill
              theme="snow"
              style={{ height: "200px" }}
              modules={modules}
              formats={formats}
              value={content}
              onChange={handleContentChange}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Image Upload: </Form.Label>
            <Form.Control
                type="file"
                onChange={handleImageFileChange}
            />
</FormGroup>

          <FormGroup className="p-2 d-flex justify-content-center">
            <Button type="submit">Submit</Button>
          </FormGroup>
        </form>
      </div>
      <Footer />
    </main>
  );
}
