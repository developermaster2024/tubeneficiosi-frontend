import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Stores from "./pages/Stores";

const Routes = () => {
  return <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/affiliates" exact component={Stores} />
    <Route path="/products" exact component={Products} />
  </Switch>;
};

export default Routes;