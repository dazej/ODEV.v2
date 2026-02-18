import React, { useEffect, useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
// import './index.css'
import Products from './components/Products'
import Login from './components/login'
import Account from './components/Account'
import Register from './components/Register'
import SingleProduct from './components/SingleProduct'
import Home from './components/home'
import { FiMenu } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import Cart from './components/cart'
import MenuModal from './components/MenuModal'
import { IconContext } from "react-icons";
import AIChat from "./components/AIChat";

function App() {

  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [cartProd, setCartProd] = useState([]);


  console.log(user)
  const navigate = useNavigate()




  useEffect(()=>{
    let savedToken = localStorage.getItem("token")
    if(savedToken !="null"){
      setToken(savedToken)
    }
  },[])

  useEffect(()=>{
    let savedUser = localStorage.getItem("user")  
    if(savedUser != "null"){
      setUser(JSON.parse(savedUser))
    }
    
  },[])

  function logOut(){
    localStorage.setItem("token", null);
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate('/login')
  }



  return(
    <>
    <IconContext.Provider value={{ color: "black", className: "menu-items" }}>
      <div id='nav'>
      <Link to="/" style={{textDecoration:'none', textDecorationColor:'black'}}><h1 id='title'>ODEV</h1></Link>
      <div id='buttons'>
        {/* {
          token?<button onClick={logOut}>Log Out</button>
          :<Link className='nav-buttons' to="/login">Login</Link>
        } */}

        {showModal && <MenuModal setUser={setUser} setToken={setToken} user={user} token={token} onClose={() => {
                setShowModal(false);
                fetchProducts()
            }} />}
            <button className="menu-button" onClick={() => {
                setShowModal(true)
             }} ><FiMenu /></button>
             </div>
      </div>
      </IconContext.Provider>



        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login  token={token} setToken={setToken} setUser={setUser} user={user}/>}></Route>
          <Route path="/users/register" element={<Register/>}></Route>
          <Route path="/users/account" element={<Account setPurchasedProducts={setPurchasedProducts} purchasedProducts={purchasedProducts} user={user} token={token} />}></Route>
          <Route path="/products" element={<Products token={token} user={user} setUser={setUser} />}></Route>
          <Route path="/products/:id/" element={ <SingleProduct user={user} setUser={setUser} token={token} setToken={setToken} />} />
          <Route path="cart/users/:id" element={<Cart setPurchasedProducts={setPurchasedProducts} purchasedProducts={purchasedProducts} cartProd={cartProd} setCartProd={setCartProd} setToken={setToken} token={token} user={user} setUser={setUser} />}   />
        </Routes>
         {/* AI chat is put here for testing. Due to having to integrate to new Github, we are still
         in the process of setting it up again*/}
      <AIChat />
    </>
  )




}

export default App