import React from 'react';
import Header from './Components/Layout/Header'
import Meals from './Components/Meals/Meals'
import Cart from './Components/Cart/Cart'
import CartProvider from './store/CartProvider'
import {useState} from 'react'

function App() {
  const[cartOpen,setCartOpen]=useState(false )
  const OpenCartHandler=()=>{
    setCartOpen(true)
  }

  const CloseCartHandler=()=>{
    setCartOpen(false)
  }

  const cart = cartOpen?<Cart close={CloseCartHandler}/>:null
  return (<CartProvider>
    {cart}
  <Header open={OpenCartHandler}/><main><Meals/></main></CartProvider>
   
  );
}

export default App;
