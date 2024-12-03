/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS for snow theme

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('blog');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to login page
      navigate('/login');
      return;
    }

    try {
      // Send the content as HTML from Quill editor along with the token
      console.log(content);
      
      // Send the token in the Authorization header
      await API.post('/posts', 
        { title, content }, 
        {
          headers: {
            Authorization: token // Add the token to the request headers
          }
        }
      );
      setLoading(false);
      setSuccess(true);
      setTitle('');
      setContent('');
      setPostType('blog');
      setTimeout(() => navigate('/'), 1500); // Redirect after 1.5 seconds
    } catch (err) {
      setLoading(false);
      alert('Failed to create post');
    }
  };

  return (
    <form className="p-8 max-w-2xl mx-auto bg-white shadow-lg rounded-md" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Create a New Post</h1>
      
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      <div className="mb-4">
        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Write your post content here..."
          className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          theme="snow" // Apply the snow theme to the Quill editor
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Post Type</label>
        <select
          value={postType}
          onChange={(e) => setPostType(e.target.value)}
          className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <option value="blog">Blog</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? 'bg-gray-500' : 'bg-gray-500 hover:bg-gray-600'
          } text-white px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200`}
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
        {success && <span className="text-green-500 text-lg">Post created successfully!</span>}
      </div>
    </form>
  );
};

export default CreatePost;
