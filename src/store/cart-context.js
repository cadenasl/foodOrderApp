import React from "react";

const cartContext = React.createContext({
  user: null,
  userId: null,
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearItems: () => {},
  signUp: (email, password, name) => {},
  SignIn: (email, password) => {},
  SignOut: () => {},
});

export default cartContext;
