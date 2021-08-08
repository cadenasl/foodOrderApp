

import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import {useContext} from 'react'
import cartContext from '../../../store/cart-context'
function MealItem(props){
 const cartCtx=useContext(cartContext)
 const addToCartHandler=(amount)=>{
    cartCtx.addItem({
        id:props.id,
        name:props.name,
        price:props.price,
        amount:amount
    })

 }
 const price=`$${props.price.toFixed(2)}`;
    return(<li className={classes.meal}>
        <div><h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div></div>
        
        <div><MealItemForm addAmountToCart={addToCartHandler}/></div>
    </li>)
}

export default MealItem