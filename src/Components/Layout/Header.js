import { Fragment } from "react"
import mealPicture from '../../assets/meals.jpg'
import HeaderCartButton from '../Layout/HeaderCartButton'
import classes from './Header.module.css'

function Header(props){
return<Fragment>
<header className={classes.header}>
    <h1>ReactMeals</h1>
   <HeaderCartButton onClick={props.open}/>
</header>
<div className={classes['main-image']}>
<img src={mealPicture} alt="a table of delicious food!"/>
</div>
</Fragment>

}

export default Header