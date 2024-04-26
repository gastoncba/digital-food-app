import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { AppStore } from '../../redux/store';
import { Button, Paragraph } from '../../components';
import { resetMenu } from '../../redux/states';
import { AuthService } from '../../services';

interface HomeProps {}

export const HomeScreen: React.FC<HomeProps> = () => {
  const menuState = useSelector((store: AppStore) => store.menu);

  const dispatch = useDispatch();

  const logout = () => {
    setTimeout(() => {
      AuthService.logout();
      dispatch(resetMenu());
    }, 2000);
  };

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', rowGap: 2 }}>
      <Box sx={{ display: 'flex', columnGap: 1 }}>
        <Paragraph text={'Menu digital de'} variant="h4" />
        <Paragraph text={menuState.name} variant="h4" color="primary" />
      </Box>
      <Button
        title="Salir"
        onClick={() => logout()}
        style={{
          width: '10%',
          ':hover': {
            bgcolor: 'black',
          },
        }}
      />
    </Box>
  );
};
