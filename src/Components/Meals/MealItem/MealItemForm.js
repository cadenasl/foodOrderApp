import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'
import { useRef, useState } from 'react'

function MealItemForm(props){
    const[errorInForm,setErrorInForm]=useState(false)
    const amountRef=useRef()
const submitHandler=(event)=>{
    event.preventDefault()
    
    const enteredAmount = amountRef.current.value
  
    const enteredAmountNumber= +enteredAmount
    
    if(enteredAmount.trim().length===0||enteredAmountNumber<1||enteredAmountNumber>5){
        setErrorInForm(true)
        return
    }
props.addAmountToCart(enteredAmountNumber);
}
    return<form className={classes.form} onSubmit={submitHandler}>
        <Input label="Amount" ref={amountRef} input={{
            id:'amount',
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1'
        }}/>
        <button>add</button>
        {errorInForm&&<p>Please enter a Valid Amount</p>}
    </form>
}

export default MealItemForm