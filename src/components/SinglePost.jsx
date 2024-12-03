/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // For getting the post ID from the URL
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';  // Import Quill's Snow theme for styling
import API from '../utils/api';

const SinglePost = () => {
  const { id } = useParams();  // Extract the post ID from the URL
  const [post, setPost] = useState(null);  // Initialize state as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fetch the single post by ID
        const { data } = await API.get(`/posts/${id}`);
        setPost(data[0]);  // Set the post data directly (no need for data[0] if the response is an object)
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setLoading(false);  // Set loading to false when the request finishes
      }
    };

    fetchPost();
  }, [id]);  // Re-fetch when the ID changes

  if (loading) {
    return <p>Loading...</p>;  // Show loading text while fetching
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;  // Show error message if any
  }

  if (!post) {
    return <p>No post found!</p>;  // Show message if post data is not available
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div
        className="react-quill"
        dangerouslySetInnerHTML={{ __html: post.content }}  // Render content using Quill's theme
      />
    </div>
  );
};

export default SinglePost;
