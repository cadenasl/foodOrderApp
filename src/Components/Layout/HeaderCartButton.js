import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'  
import {useContext,useEffect, useState} from 'react'
import cartContext from '../../store/cart-context'

function HeaderCartButton(props){
  
  const[bumpClass,setBumpClass]=useState(false)
   const cartctx= useContext(cartContext)
   const{items}=cartctx
   const numberOfItems=items.reduce((currentNum,item)=>{return currentNum+item.amount},0)

   const buttonClasses=`${classes.button} ${bumpClass?classes.bump:null}`
   useEffect((
     
   )=>{
     if(items.length===0){
       return;
     }
    setBumpClass(true)
  const timer=setTimeout(()=>{setBumpClass(false)},300)
  return()=>{
    clearTimeout(timer)
  }
  },[items]);
return<button onClick={props.onClick} className={buttonClasses}>
    <span className={classes.icon}><CartIcon/></span> 

    <span>Your Cart</span>
    <span className={classes.badge}>{numberOfItems}</span>
</button>
}

export default HeaderCartButton