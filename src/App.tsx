import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { RoutesController } from '../src/routes/RouterController.routes';
import { themeMaterial } from './settings';
import store from './redux/store';

const App = () => {
  return (
    <>
      <ThemeProvider theme={themeMaterial}>
        <ToastContainer />
        <Provider store={store}>
          <RoutesController />
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
