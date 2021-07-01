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
import OrderDetails from "./pages/OrderDetails";
import PrivateRoute from "./components/PrivateRoute";

const Routes = () => {
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
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders/:ref" exact component={OrderDetails} />
      </PrivateRoute>
    </Switch>
  )
};

export default Routes;