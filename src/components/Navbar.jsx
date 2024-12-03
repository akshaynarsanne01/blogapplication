/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [token,setToken] = useState(null);
  useEffect(()=>{
    setToken(localStorage.getItem('token'));
  },[])
  return (
    <nav className="bg-transparent border-2 border-gray-200 p-8 flex justify-center space-x-8 items-center text-black">
      <div className='space-x-4'>
        <Link to="/blog" className="">Home</Link>
        {
          token && <Link to="/create" className="">Create Post</Link>
        }
        <Link to="/login" className="">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
