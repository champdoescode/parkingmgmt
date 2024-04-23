import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

export default function Lgoin() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [items, setItems] = useState([]);
    // console.log(password);
    // console.log(name);

    useEffect(() => {
      const items = JSON.parse(sessionStorage.getItem('userInfo'));
      if (items) {
       setItems(items);
      }
    }, []);
    function handleSubmit() {
        const username = items.find(({ Name },index) => 
            Name === name,
            
        );
        const enteredPassword = items.find(({ Password },i) =>
            Password === password,
        );
        if(username && enteredPassword){
            alert("Data found");
        }
        else{
            alert("data not found please enter correct data");
            // window.location.reload();
        }
      };
  return (
    <div>
    <div className="background ">
  <div className="box flex flex-col justify-center items-center w-full">
    <div className=" flex flex-col bg-slate-50 p-16 mt-16 shadow-xl rounded-lg w-6/12">
      <h3 className='text-4xl text-center text-slate-700 font-semibold'>Sign In</h3>
      <label className='mt-4'  htmlFor="name"> Name </label>
      <input
        className='rounded border border-slate-400 my-2 h-12 p-4 focus:outline-none focus:border focus:border-black'
        type="text"
        name="email"
        placeholder="Type your name"
        onChange={(e) => setName(e.target.value)}
        value={name}
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
      
      <NavLink to='dashboard'  onClick={handleSubmit} className='bg-slate-700 text-white text-center py-2 my-2 rounded hover:bg-slate-900'>LogIn</NavLink>
    </div>
  </div>
</div>
    
</div>
  )
}
