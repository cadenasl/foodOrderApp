import React, { useContext } from "react";

import Meals from "./Components/Meals/Meals";

import UserAuth from "./Pages/userAuth";

import Layout from "./Components/Layout/Layout";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import cartContext from "./store/cart-context";

import "./app.css";

function App() {
  const ctx = useContext(cartContext);
  console.log(ctx);

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <UserAuth />
          </Route>

          {ctx.user && (
            <Route path="/order">
              <Meals />
            </Route>
          )}
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
