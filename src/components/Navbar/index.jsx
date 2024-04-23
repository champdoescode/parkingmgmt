import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState();
  useEffect(()=>{
    let value = localStorage.getItem('UserType');
    setIsLogin(value);
  },[isLogin])
  const handleLogout = () => {
    alert('Logged Out !')
    localStorage.clear();
    navigate('/login')
  }
  return (
    <>
        {/* <div className='text-black bg-slate-50 p-6 shadow-xl'>
            <NavLink className='text-lg p-4 hover:underline' to='/' >Registration</NavLink>
            <NavLink className='text-lg p-4 hover:underline' to='login' onClick={isLogin && handleLogout } >{!isLogin || isLogin === 'undefined' ? 'LogIn' : 'LogOut'}</NavLink>
        </div> */}
        <div>
            <Outlet/>
        </div>
    </>
  )
}

export default Navbar