import Header from "./Header";
import React from "react";
import Cart from "../Cart/Cart";
import { useState } from "react";
const Layout = (props) => {
  const [cartOpen, setCartOpen] = useState(false);
  const OpenCartHandler = () => {
    setCartOpen(true);
  };

  const CloseCartHandler = () => {
    setCartOpen(false);
  };

  const cart = cartOpen ? <Cart close={CloseCartHandler} /> : null;

  return (
    <React.Fragment>
      {cart}
      <Header open={OpenCartHandler} />
      <main className="main">{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
