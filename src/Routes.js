import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Products from "./pages/Products";
import Stores from "./pages/Stores";
import Product from "./pages/Product";
import Benefits from "./pages/Benefits";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyAccountRoutes from './MyAccountRoutes';
import Checkout from "./pages/Checkout";
import PrivateRoute from "./components/PrivateRoute";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import CheckoutSuccess from "./pages/CheckoutSuccess";

const Routes = () => {

  const history = useHistory();

  useEffect(() => {
    history?.listen((location, action) => {
      window.scrollTo({ top: 0 });
    });
  }, [history]);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/stores" exact component={Stores} />
      <Route path="/stores/:slug" exact component={Store} />
      <Route path="/products" exact component={Products} />
      <Route path="/products/:slug" exact component={Product} />
      <Route path="/benefits" exact component={Benefits} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />

      <PrivateRoute>
        <Route path="/my-account" component={MyAccountRoutes} />
        <Route path="/checkout" component={Checkout} exact />
        <Route path="/checkout/:id" component={CheckoutSuccess} exact />
      </PrivateRoute>
    </Switch>
  )
};

export default Routes;