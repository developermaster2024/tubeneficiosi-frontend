import { Route, Switch, Redirect } from "react-router";
import MyAccountLayout from './components/MyAccountLayout';
import MyAccountDashboard from './pages/my-account/Dashboard';
import MyAccountInfo from './pages/my-account/Info';

const MyAccountRoutes = () => {

  return (
    <MyAccountLayout>
      <Switch>
        <Redirect path="/my-account" to="/my-account/dashboard" exact />
        <Route path="/my-account/dashboard" exact component={MyAccountDashboard} />
        <Route path="/my-account/info" exact component={MyAccountInfo} />
      </Switch>
    </MyAccountLayout>
  )
};

export default MyAccountRoutes;