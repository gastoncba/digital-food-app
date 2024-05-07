import { useEffect, useRef } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useLocation } from 'react-router-dom';

import { RoutesController } from '../src/routes/RouterController.routes';
import { themeMaterial } from './settings';
import store from './redux/store';

const App = () => {
  const scrollbarRef = useRef<any>();
  const location = useLocation();

  useEffect(() => {
    scrollbarRef.current.scrollTop = 0;
  }, [location.pathname]);

  return (
    <>
      <ThemeProvider theme={themeMaterial}>
        <ToastContainer />
        <Provider store={store}>
          <PerfectScrollbar style={{ height: '100vh' }} ref={scrollbarRef}>
            <RoutesController />
          </PerfectScrollbar>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
