import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';

import { Login } from './Login';

interface AuthProps {}

type typeAuthScreen = 'login' | 'signup';

export const AuthScreen: React.FC<AuthProps> = () => {
  const location = useLocation();
  const { state } = location;
  const [activeScreen] = useState<typeAuthScreen>(
    state !== null ? state.type : 'login'
  );

  const renderScreen = () => {
    switch (activeScreen) {
      case 'login':
        return <Login />;
      case 'signup':
        return <div>signup</div>;
      default:
        return <Login />;
    }
  };

  return (
    <Grid container justifyContent={'center'} sx={{ py: 2 }}>
      <Grid item xs={12} sm={8} md={6} lg={5} xl={5}>
        {renderScreen()}
      </Grid>
    </Grid>
  );
};
