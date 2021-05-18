import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import Stores from "./pages/Stores";

const Routes = () => {
  return <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/stores" exact component={Stores} />
  </Switch>;
};

export default Routes;