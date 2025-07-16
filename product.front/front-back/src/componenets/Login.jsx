import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom'; 
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/auth/login', formData);

    
      localStorage.setItem('token', res.data.token);

      alert('Login successful!');

    
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
         <Link to="/register" style={{marginLeft:"100px" ,color:"red"}}>Register</Link>

      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    height: '100vh', backgroundColor: '#f4f4f4'
  },
  form: {
    display: 'flex', flexDirection: 'column', padding: '20px',
    backgroundColor: 'white', borderRadius: '10px', width: '300px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  input: {
    marginBottom: '15px', padding: '10px', borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px', backgroundColor: '#007bff', color: 'white',
    border: 'none', borderRadius: '5px', cursor: 'pointer'
  }
};

export default Login;
