import { Fragment, useContext } from "react";
import mealPicture from "../../assets/meals.jpg";
import HeaderCartButton from "../Layout/HeaderCartButton";
import classes from "./Header.module.css";
import cartContext from "../../store/cart-context";
import { useHistory } from "react-router";
import Button from "react-bootstrap/Button";

function Header(props) {
  const Ctx = useContext(cartContext);
  const history = useHistory();

  const signOutHandler = () => {
    try {
      Ctx.SignOut();
      history.push("/");
    } catch (err) {
      console.log(err);
    }

    console.log("signed out");
  };
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <div className={classes.headerIcons}>
          {Ctx.user != null && <HeaderCartButton onClick={props.open} />}
          {Ctx.user && (
            <Button
              type="submit"
              onClick={signOutHandler}
              variant="outline-danger"
            >
              Sign out
            </Button>
          )}
        </div>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealPicture} alt="a table of delicious food!" />
      </div>
    </Fragment>
  );
}

export default Header;
