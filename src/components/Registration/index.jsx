import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const Registration = () => {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [shopholder, setShopholder] = useState(false);
  const [shopno, setShopno] = useState("");
  const Items = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
    const [Info, setInfo] =useState(Items??[]);
    function handleSubmission() {
      let userData = {};
    
    if (name !== '' && email !== '' && number !== '' && password !== '' && cpassword !== '') {
      if (shopholder) {
        if (shopno !== '') {
          userData = {
            name: name,
            email: email,
            number: number,
            password: password,
            cpassword: cpassword,
            shopholder: shopholder,
            shopno: shopno
          };
          submitTheForm(userData)
        } else {
          alert('Please fill shop no');
          return;
        }
      } else {
        userData = {
          name: name,
          email: email,
          number: number,
          password: password,
          cpassword: cpassword,
        };
        submitTheForm(userData);
      }
  
    
    } else {
      alert('Please fill all data');
    }
  }

  const submitTheForm = (userData) => {
    console.log(userData, "Here is userdata")
    if(!userData.shopholder){
      userData.type = 'Other'
    }else{
      userData.type = 'ShopOwner'
    }
    fetch('http://localhost:5000/api/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((data) => {
        if(data.status == 200){
          console.log('Data sent successfully:', data); 
          alert('User Added !')
          navigate('/login')
        }else{
          if(data.status == 600){
            alert('User Already Exist');
          }else{
            alert('Something Went Wrong')
          }
        }
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  }

  return (
    <>
<div className='text-black bg-slate-50 p-6 shadow-xl'>
            <NavLink className='text-lg p-4 hover:underline' to='/' >Registration</NavLink>
            <NavLink className='text-lg p-4 hover:underline' to='login' >LogIn</NavLink>
        </div>

<div className="background ">
      <div className="box flex flex-col justify-center items-center w-full">
        <div className=" flex flex-col bg-slate-50 p-8 mt-8 shadow-xl rounded-lg w-5/12">
          <h3 className='text-4xl text-center text-slate-700 font-semibold'>Sign Up</h3>
          <label className='mt-4'  htmlFor="name"> Name </label>
          <input
            className='rounded border border-slate-400 my-2 h-10 p-4 focus:outline-none focus:border focus:border-black'
            type="text"
            name="email"
            placeholder="Type your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label htmlFor="email"> Email </label>
          <input
            className='rounded border border-slate-400 my-2 h-10 p-4 focus:outline-none focus:border focus:border-black'
            type="email"
            name="email"
            placeholder="Type your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="number"> Number </label>
          <input
            className='rounded border border-slate-400 my-2 h-10 p-4 focus:outline-none focus:border focus:border-black'
            type="number"
            name="num"
            placeholder="Type your number"
            onChange={(e) => setNumber(e.target.value)}
            value={number}
          />
          {/* <label htmlFor="address"> Address </label>
          <input
            className='rounded border border-slate-400 my-2 h-10 p-4 focus:outline-none focus:border focus:border-black'
            type="text"
            name="address"
            placeholder="Type your address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          /> */}
          <label htmlFor="password"> Password </label>
          <input
            className='rounded border border-slate-400 my-2 h-10 p-4 focus:outline-none focus:border focus:border-black'
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label htmlFor="cpassword"> Confirm Password </label>
          <input
            className='rounded border border-slate-400 my-2 h-10 p-4 focus:outline-none focus:border focus:border-black'
            type="password"
            name="cpassword"
            placeholder="Confirm Password"
            onChange={(e) => setCPassword(e.target.value)}
            value={cpassword}
          />
          <div className='flex'>
            <div>I'm Shop Owner</div>
            <input className="ml-2" type='checkbox' name='shopholder' checked={shopholder} onClick={(e)=>setShopholder(!shopholder)} / >
          </div>

          { shopholder &&
            <>
            <label htmlFor="shopno"> Shop No </label>
          <input
            className='rounded border border-slate-400 my-2 h-10 p-4 focus:outline-none focus:border focus:border-black'
            type="text"
            name="shopno"
            placeholder="Enter your shop no"
            onChange={(e) => setShopno(e.target.value)}
            value={shopno}
          />
          </>
          }
          
          <div to='login' onClick={handleSubmission} className='bg-slate-700 text-white text-center py-2 my-2 rounded hover:bg-slate-900'>Sign Up</div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Registration