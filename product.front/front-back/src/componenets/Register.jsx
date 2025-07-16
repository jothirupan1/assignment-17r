import React, { useState } from 'react'
import axios from 'axios'
import {Navigate, useNavigate} from 'react-router-dom'

function Register() {
    const navigate=useNavigate()
const [reg,setReg]=useState({  
    email: '',
    password:'',
    role:''})

const handleChange =(e)=>{
    setReg(prev =>({
        ...prev,
        [e.target.name]:e.target.value
    }))
}

const handleSubmit = async(e)=>{
  e.preventDefault();
  try{
    axios.post("http://localhost:3001/auth/register",reg)
    .then(res =>{alert('registered successfully ')})
    navigate('/')
  }catch(err){
    console.error(err)
    alert(err.response?.data?.message || "Registration failed");
  }
}
    

  return (
       <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Register</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={reg.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={reg.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
            <input
          
          name="role"
          placeholder="Role"
          value={reg.role}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  )
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

export default Register