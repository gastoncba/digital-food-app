import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

import { Button, Image, Modal, Paragraph, Wrapper } from '../../components';
import { AppStore } from '../../redux/store';
import { useState } from 'react';

interface ConfigProps {}

export const ConfigScreen: React.FC<ConfigProps> = () => {
  const menuState = useSelector((store: AppStore) => store.menu);
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Wrapper>
          <Paragraph text={'Configuraciones'} variant="h5" />
          <Grid container sx={{ py: 2 }} columnSpacing={4} rowSpacing={4}>
            <Grid item sm={6} xs={12}>
              <Paragraph text={menuState.name} color="primary" variant="h4" />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  py: 2,
                }}
              >
                <Image
                  img={
                    'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                  }
                  size={280}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  title="Cambiar"
                  onClick={() => setShowModal(true)}
                  style={{
                    my: 2,
                    ':hover': { bgcolor: 'black' },
                  }}
                />
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}></Grid>
          </Grid>
        </Wrapper>
      </Box>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Menú">
        <div>form</div>
      </Modal>
    </>
  );
};
