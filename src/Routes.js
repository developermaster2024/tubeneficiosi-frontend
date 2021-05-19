import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Products from "./pages/Products";
import Stores from "./pages/Stores";
import Product from "./pages/Product";

const Routes = () => {
  return <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/stores" exact component={Stores} />
    <Route path="/stores/:slug" exact component={Store} />
    <Route path="/products" exact component={Products} />
    <Route path="/products/:slug" exact component={Product} />
  </Switch>;
};

export default Routes;