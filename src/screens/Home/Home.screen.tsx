import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Theme, useMediaQuery } from '@mui/material';
import QRCode from 'react-qr-code';

import { AppStore } from '../../redux/store';
import { Animation, Button, Modal, Paragraph } from '../../components';
import { resetMenu } from '../../redux/states';
import { AuthService } from '../../services';
import { APP, themeMaterial } from '../../settings';
import { GenericsUtils } from '../../utils';

interface HomeProps {}

const { main } = themeMaterial.palette.primary;

export const HomeScreen: React.FC<HomeProps> = () => {
  const menuState = useSelector((store: AppStore) => store.menu);
  const dispatch = useDispatch();
  const lessToMd = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );
  const lessToSm = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  const logout = () => {
    setTimeout(() => {
      AuthService.logout();
      dispatch(resetMenu());
    }, 2000);
  };

  return (
    <>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', rowGap: 2 }}>
        <Grid container columnSpacing={2} rowGap={2} sx={{ pt: 4 }}>
          <Grid item md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 4 }}>
              <Animation type="LEFT" delay={0.2}>
                <Paragraph
                  text={'¡Crea tu menú digital hoy mismo!'}
                  variant="h4"
                  color="primary"
                />
              </Animation>
              <Animation type="LEFT" delay={0.3}>
                <Paragraph
                  text={
                    'Los menús digitales transforman la experiencia gastronomica'
                  }
                  variant="h3"
                />
              </Animation>
              {!lessToMd && (
                <Animation type="LEFT" delay={0.4}>
                  <Paragraph
                    text={
                      'Completa tu menú con las secciones y comidas, y luego escanea el código QR para verlo'
                    }
                    color="GrayText"
                    sx={{ mb: 1 }}
                  />
                </Animation>
              )}
            </Box>
          </Grid>
          <Grid item md={6}>
            <Animation type="LEFT" duration={0.5} delay={0.2}>
              <Box
                sx={{
                  display: 'flex',
                  columnGap: 2,
                  ...(lessToMd && { pt: 4 }),
                  ...(lessToSm && { flexDirection: 'column' }),
                }}
              >
                <Box>
                  <QRCode
                    style={{
                      border: `5px solid ${main}`,
                      borderRadius: '16px',
                      cursor: 'pointer',
                    }}
                    onClick={() => setShowModal(true)}
                    value={APP.URL + `/app/${menuState.name}/${menuState.id}`}
                  />
                </Box>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}
                >
                  <Paragraph
                    text={'QR de\n' + menuState.name}
                    variant="h4"
                    color="primary"
                    sx={{ ...(lessToSm && { mt: 1 }) }}
                  />
                  {lessToMd && (
                    <Animation type="LEFT" delay={0.4}>
                      <Paragraph
                        text={
                          'Completa tu menú con las secciones y comidas, y luego escanea el código QR para verlo'
                        }
                        color="GrayText"
                        sx={{ mb: 1 }}
                      />
                    </Animation>
                  )}
                </Box>
              </Box>
            </Animation>
          </Grid>
        </Grid>
        <Animation type="LEFT" delay={0.4}>
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
        </Animation>
      </Box>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={'QR del menú'}
      >
        <Box sx={{ border: `5px solid ${main}`, borderRadius: '16px', p: 2 }}>
          <QRCode
            style={{
              height: 'auto',
              maxWidth: '100%',
              width: '100%',
              borderRadius: '16px',
            }}
            viewBox={`0 0 256 256`}
            id="box-id"
            value={APP.URL + `/app/${menuState.name}/${menuState.id}`}
          />
        </Box>
        <Box sx={{ display: 'flex', columnGap: 1, pt: 1 }}>
          <Button
            title="Descargar QR"
            onClick={() =>
              GenericsUtils.downloadQR(
                'QRCode',
                'Menu-digital-de-' + menuState.name
              )
            }
          />
          <Button
            title="Copiar enlace"
            onClick={() =>
              GenericsUtils.writeText(
                APP.URL + `/app/${menuState.name}/${menuState.id}`
              )
            }
          />
        </Box>
      </Modal>
    </>
  );
};
