
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, Routes, Route } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { BsCart4 } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { IoPersonAddOutline } from "react-icons/io5";
import { IconContext } from "react-icons";


export default function MenuModal({user, token, onClose, setUser, setToken}) {


    function logOut(){
        localStorage.setItem("token", null);
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        navigate('/login')
      }
    


    return (
        <div className='menumodal'>
        <IconContext.Provider value={{className: "menu-icons" }}>
            <div className='menu-close'>
        <button  className='close-button' onClick={onClose}><IoMdClose /></button>
        </div>
        <Link className='nav-buttons' to="/users/register">Register <IoPersonAddOutline /></Link>
        {token?<Link className='nav-buttons' to="/users/account">Account <VscAccount /></Link>: null}

        <Link className='nav-buttons' to="/products">Shop <FiShoppingBag /></Link>
        <Link className='nav-buttons'  to={`/cart/users/${user?.id}`} >Cart <BsCart4 /></Link>
        {
          token?<button className='nav-buttons' onClick={logOut}>Log Out <IoLogOutOutline /></button>
          :<Link className='nav-buttons' to="/login">Login</Link>
        }
        </IconContext.Provider>;
        </div>
    )


}