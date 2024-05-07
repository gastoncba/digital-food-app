import { Box, Grid, useMediaQuery, Theme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Animation, Button, Image, Paragraph } from '../../components';

interface LandingProps {}

export const LandingScreen: React.FC<LandingProps> = () => {
  const navigate = useNavigate();
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <>
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', rowGap: 1 }}>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
              <Animation type="SLICE" duration={0.5}>
                <Paragraph text={'Digital Food'} color="primary" variant="h3" />
              </Animation>
              <Animation type="SLICE" duration={0.7}>
                <Paragraph
                  text={
                    'Bienvenido a la solución moderna para crear menús digitales para tu comercio'
                  }
                  variant="h3"
                  fontSize={50}
                />
              </Animation>
              <Animation type="SLICE" duration={0.97}>
                <Paragraph
                  text={
                    'All the best restaurants, from quick service to Michelin star, choose to take payments with sunday'
                  }
                  color="GrayText"
                />
              </Animation>
              <Animation type="BOOM" duration={0.3} delay={2}>
                <Box sx={{ display: 'flex', columnGap: 2, py: 2 }}>
                  <Button
                    title="Empezar"
                    onClick={() =>
                      navigate('/auth', { state: { type: 'signup' } })
                    }
                  />
                  <Button
                    title="Ingresar"
                    onClick={() =>
                      navigate('/auth', { state: { type: 'login' } })
                    }
                  />
                </Box>
              </Animation>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Animation type="BOOM">
              <Box
                sx={{
                  display: isMd ? 'flex' : 'none',
                  justifyContent: 'center',
                }}
              >
                <Image
                  img={
                    'https://madnessprint.com/wp-content/uploads/2021/06/qr-code-pagando-pedido1.jpg'
                  }
                  size={360}
                />
              </Box>
            </Animation>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
