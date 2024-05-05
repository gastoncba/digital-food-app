import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';

import { Login } from './Login';
import { Signup } from './Signup';

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
        return <Signup />;
      default:
        return <Login />;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      {renderScreen()}
    </Container>
  );
};
