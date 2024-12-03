/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const { title, content, id } = post;

  // Get a preview of the content (first 100 characters)
  const contentPreview = content.length > 100 ? content.slice(0, 100) + '...' : content;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: contentPreview }}></p>
      <Link
        to={`/post/${id}`}  // Navigate to the SinglePost page with post id
        className="text-blue-500 hover:underline"
      >
        Read More
      </Link>
    </div>
  );
};

export default PostCard;
