import classes from "./Checkout.module.css"

import useInput from '../../useHooks/useInput'

const Checkout=(props)=>{
    
    const{input:name, inputIsValid:nameIsValid,
        inputIsNotValid:nameIsNotValid,
        inputOnChangeHandler:nameOnChangeHandler,
        inputOnBlurHandler:nameOnBlurHandler,
        reset:nameReset
    }=useInput(value=>value.trim()!=='')

    const{input:street, inputIsValid:streetIsValid,
        inputIsNotValid:streetIsNotValid,
        inputOnChangeHandler:streetOnChangeHandler,
        inputOnBlurHandler:streetOnBlurHandler,
        reset:streetReset
    }=useInput(value=>value.trim()!=='')
    
    const{input:postal, inputIsValid:postalIsValid,
        inputIsNotValid:postalIsNotValid,
        inputOnChangeHandler:postalOnChangeHandler,
        inputOnBlurHandler:postalOnBlurHandler,
        reset:postalReset
    }=useInput(value=>value.trim()!=='')

    const{input:city, inputIsValid:cityIsValid,
        inputIsNotValid:cityIsNotValid,
        inputOnChangeHandler:cityOnChangeHandler,
        inputOnBlurHandler:cityOnBlurHandler,
        reset:cityReset
    }=useInput(value=>value.trim()!=='')

   
    
    const submitFormHandler=(event)=>{
        event.preventDefault()
        console.log(name);
        nameReset();
        console.log(street);
        streetReset();
        console.log(postal)
        postalReset()
        console.log(city)
        cityReset();
        props.onConfirm({userName:name,
                        userStreet:street,
                        userPostal:postal,
                        usercity:city
        })
    }
        
        let overallForm=false
        if(nameIsValid&&streetIsValid&&postalIsValid&&cityIsValid){
            overallForm=true
        }


return(<form className={classes.form} onSubmit={submitFormHandler}>
    <div className={`${classes.control} ${nameIsNotValid?classes.invalid:null}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={name} onChange={nameOnChangeHandler} onBlur={nameOnBlurHandler}/>
        {nameIsNotValid?<p>please put a valid name</p>:null}
    </div>
    <div className={`${classes.control} ${streetIsNotValid?classes.invalid:null}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' value={street} onChange={streetOnChangeHandler} onBlur={streetOnBlurHandler}/>
        {streetIsNotValid?<p>please put a valid name</p>:null}
    </div>
    <div className={`${classes.control} ${postalIsNotValid?classes.invalid:null}`}>
        <label htmlFor='postal'>Postal</label>
        <input type='text' id='postal' value={postal} onChange={postalOnChangeHandler} onBlur={postalOnBlurHandler}/>
        {postalIsNotValid?<p>please put a valid name</p>:null}
    </div>
    <div className={`${classes.control} ${cityIsNotValid?classes.invalid:null}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' value={city} onChange={cityOnChangeHandler} onBlur={cityOnBlurHandler}/>
        {cityIsNotValid?<p>please put a valid name</p>:null}
    </div>
    <button disabled={!overallForm}>confirm</button>
    <button type='button' onClick={props.onCancel}>cancel</button>
</form>)

}


export default Checkout