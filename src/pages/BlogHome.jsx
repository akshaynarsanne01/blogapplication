/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import API from '../utils/api';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await API.get('/posts');
        console.log(data);  // Check the structure of the response
        setPosts(data);
      } catch (err) {
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const dummyPosts = [
    { id: '1', title: 'Sample Post 1', content: 'This is a sample post content for post 1.' },
  ];

  const postsToDisplay = loading || error ? dummyPosts : posts;

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Recent Posts</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p className="text-black">{error}</p>}
      {!error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-2/3 gap-4">
          {postsToDisplay.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
