import classes from "./Modal.module.css"
import React from "react"
import ReactDom from 'react-dom'

function Backdrop(props){
return <div onClick={props.onClick} className={classes.backdrop}/>
}

function ModalOverlay(props){
return(<div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
</div>)
}

function Modal(props){
const modalDiv = document.getElementById('overlay')
    return<React.Fragment>
        {ReactDom.createPortal(<Backdrop onClick={props.onClick}/>,modalDiv)}
        {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,modalDiv)}
    </React.Fragment>
}

export default Modal;