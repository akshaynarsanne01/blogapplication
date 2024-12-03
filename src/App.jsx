
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogHome from './pages/BlogHome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreatePost from './pages/CreatePost';
import SinglePost from './components/SinglePost';
import { useEffect } from 'react';
const App = () => {
  useEffect(() => {
    document.body.classList.add('animated-background');
    return () => {
      document.body.classList.remove('animated-background');
    };
  }, []);
  return (
    <Router>
      <Navbar />
      <div className="container p-4 text-black">
        <Routes>
          <Route path="/" element={<BlogHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<SinglePost />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
