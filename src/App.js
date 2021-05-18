import AppLayout from './components/AppLayout';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

const App = () => {
  return (
    <Router>
      <AppLayout>
          <Routes />
      </AppLayout>
    </Router>
  );
};

export default App;
