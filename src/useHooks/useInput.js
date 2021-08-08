import {useState} from 'react'

const useInput=(validate)=>{
    const[input,setInput]=useState('')
    const[inputIsTouched,setInputIsTouched]=useState(false)

    const inputOnChangeHandler=(event)=>{
        setInput(event.target.value)
    }

    const inputOnBlurHandler=()=>{
        setInputIsTouched(true)

    }
    
    
    const inputIsValid=validate(input)
    const inputIsNotValid=!inputIsValid&&inputIsTouched

    const reset=()=>{
        setInput('')
        setInputIsTouched('')
    }


return{input:input,
    inputIsValid:inputIsValid,
    inputIsNotValid:inputIsNotValid,
    inputOnChangeHandler:inputOnChangeHandler,
    inputOnBlurHandler:inputOnBlurHandler,
    reset:reset


}
}


export default useInput