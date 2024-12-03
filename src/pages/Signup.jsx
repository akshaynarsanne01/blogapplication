/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', { username, email, password });
      navigate('/login');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <form className="p-4 flex flex-col justify-center items-center h-96" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4 text-center">Signup</h1>
      <div className='flex flex-col justify-center items-center'> 
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="border p-2 w-96 mb-4 rounded-xl" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 w-96 mb-4 rounded-xl" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border p-2 w-96 mb-4 rounded-xl" />
      <button type="submit" className="bg-gray-500 text-white px-4 py-2 rounded">Signup</button>

      </div>
    </form>
  );
};

export default Signup;
