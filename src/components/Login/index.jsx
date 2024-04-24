import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const items = JSON.parse(localStorage.getItem('userInfo'));
      if (items) {
       setItems(items);
      }
    }, []);
    function handleSubmit() {
      console.log(email, password)
      fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'email':email,'password':password}),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.length){
          console.log(data);
          alert('Successfully Login')
          localStorage.setItem('UserType', data[0].type)
          localStorage.setItem('Email', data[0].email)
          navigate('/login/dashboard')
        }else{
          alert('Please Fill correct values !')
        }
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
     
      };
  return (
    <>
    <div className='text-black bg-slate-50 p-6 shadow-xl'>
            <NavLink className='text-lg p-4 hover:underline' to='/' >Registration</NavLink>
            <NavLink className='text-lg p-4 hover:underline' to='/login' >LogIn</NavLink>
        </div>
    <div>
        <div className="background ">
      <div className="box flex flex-col justify-center items-center w-full">
        <div className=" flex flex-col bg-slate-50 p-16 mt-16 shadow-xl rounded-lg w-6/12">
          <h3 className='text-4xl text-center text-slate-700 font-semibold'>Sign In</h3>
          <label className='mt-4'  htmlFor="email"> Email </label>
          <input
            className='rounded border border-slate-400 my-2 h-12 p-4 focus:outline-none focus:border focus:border-black'
            type="text"
            name="email"
            placeholder="Type your name"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="email"> Password </label>
          <input
            className='rounded border border-slate-400 my-2 h-12 p-4 focus:outline-none focus:border focus:border-black'
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          
          <div onClick={handleSubmit} className='bg-slate-700 text-white text-center py-2 my-2 rounded hover:bg-slate-900'>LogIn</div>
        </div>
      </div>
    </div>
        
    </div>
    </>
  )
}

export default Login