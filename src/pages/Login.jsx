/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/users/login', { email, password });
      console.log(data);
      localStorage.setItem('token', 'Bearer '+data.token);
      navigate('/');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <form className="p-4 space-x-4 flex flex-col justify-center items-center text-center  h-96" onSubmit={handleSubmit}>
      <div>
        <h1 className="text-2xl font-bold mb-4">Login</h1>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 w-96 mb-4 rounded-xl" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border p-2 w-96 mb-4 rounded-xl" />
        <button type="submit" className="bg-gray-500 text-white px-4 py-2 rounded">Login</button>

      </div>
    </form>
  );
};

export default Login;
