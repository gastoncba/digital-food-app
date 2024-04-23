import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Button, Paragraph } from '../../components';

interface LandingProps {}

export const LandingScreen: React.FC<LandingProps> = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', rowGap: 1 }}>
        <Paragraph text={'Digital Food'} color="primary" variant="h3" />
        <Paragraph
          text={
            'Bienvenido a la solución moderna para crear menús digitales para tu comercio'
          }
          variant="h3"
          sx={{ width: '50%' }}
          fontSize={50}
        />
        <Paragraph
          text={
            'All the best restaurants, from quick service to Michelin star, choose to take payments with sunday'
          }
          color="GrayText"
        />
        <Button
          title="Empezar"
          onClick={() => navigate('/auth', { state: { type: 'login' } })}
          style={{ width: '10%' }}
        />
      </Box>
    </>
  );
};
