import AppLayout from './components/AppLayout';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

const App = () => {
  return (
    <AppLayout>
      <Router>
        <Routes />
      </Router>
    </AppLayout>
  );
};

export default App;
