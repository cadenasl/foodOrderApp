import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import cartContext from "../../store/cart-context";
import CartItem from "./cartItem";
import Checkout from "./Checkout";
import React from "react";
import { db } from "../../firebase";

function Cart(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const [openCheckOut, setOpenCheckOut] = useState(false);
  const cartCtx = useContext(cartContext);
  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  console.log(cartCtx.user.uid);
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemDeleteHandler = (id) => {
    console.log(id);
    cartCtx.removeItem(id);
  };

  const checkOutHandler = () => {
    setOpenCheckOut(true);
  };

  const closeCheckOutHandler = () => {
    setOpenCheckOut(false);
  };

  const submitHandler = (userData) => {
    setDidSubmit(true);
    setIsLoading(true);
    const orderRef = db
      .collection("users")
      .doc(cartCtx.user.uid)
      .collection("orders");
    orderRef
      .add({ order: cartCtx.items, address: userData })
      .then((docRef) => {
        console.log("Document is updated", docRef.id);
      })
      .catch((error) => {
        console.log("Error adding document", error);
      });

    setIsLoading(false);
    cartCtx.clearItems();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={cartItemDeleteHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const modalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {openCheckOut ? (
        <Checkout onConfirm={submitHandler} onCancel={closeCheckOutHandler} />
      ) : null}
      {!openCheckOut ? (
        <div className={classes.actions}>
          <button onClick={props.close} className={classes["button--alt"]}>
            Close
          </button>
          <button onClick={checkOutHandler} className={classes.button}>
            Order
          </button>
        </div>
      ) : null}
    </React.Fragment>
  );
  return (
    <Modal onClick={props.close}>
      {isLoading && <p>loading...</p>}
      {!isLoading && !didSubmit ? modalContent : null}
      {!isLoading && didSubmit ? (
        <div className={classes.actions}>
          <p>Success! Order will be ready soon</p>
          <button onClick={props.close} className={classes.button}>
            close
          </button>
        </div>
      ) : null}
    </Modal>
  );
}
export default Cart;
