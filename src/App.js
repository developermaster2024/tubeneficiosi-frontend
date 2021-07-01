import AppLayout from './components/AppLayout';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { useAuth } from './contexts/AuthContext';
import { useEffect, useState } from 'react';

const App = () => {

  const { customLoading } = useAuth();

  const [dots, setDots] = useState("");

  useEffect(() => {

    let id;

    if (customLoading.show) {
      id = setInterval(() => {
        setDots((oldDots) => oldDots.length < 3 ? oldDots + "." : "");
        console.log("me ejecute");
      }, 500);
    }

    return () => {
      if (id) clearInterval(id);
    }
  }, [customLoading]);

  return (
    <Router>
      {
        customLoading.show ?
          <div className="w-full h-full bg-white flex bg-opacity-80 z-50 fixed">
            <div className="m-auto">
              <div className="spinner">
                <div className="double-bounce1 bg-main"></div>
                <div className="double-bounce2 bg-main"></div>
              </div>
              <div className="text-gray-700 text-2xl">{customLoading.message}{dots}</div>
            </div>

          </div>
          :
          null
      }
      <AppLayout>
        <Routes />
      </AppLayout>
    </Router>
  );
};

export default App;
