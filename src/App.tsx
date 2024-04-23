import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

import { RoutesController } from '../src/routes/RouterController.routes';
import { themeMaterial } from './settings';
import store from './redux/store';

const App = () => {
  return (
    <>
      <ThemeProvider theme={themeMaterial}>
        <Provider store={store}>
          <RoutesController />
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
