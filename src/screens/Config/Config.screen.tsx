import { Box, Grid, Theme, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Form,
  Image,
  Modal,
  Paragraph,
  Wrapper,
  showToast,
} from '../../components';
import { AppStore } from '../../redux/store';
import { useState } from 'react';
import { MenuService } from '../../services';
import { modifyMenu } from '../../redux/states';

interface ConfigProps {}

interface MenuValue {
  name: string;
  photo: string;
}

export const ConfigScreen: React.FC<ConfigProps> = () => {
  const menuState = useSelector((store: AppStore) => store.menu);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState<boolean>(false);
  const lessToSm = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const [form, setForm] = useState<any>(null);

  const updateMenu = async (values: MenuValue) => {
    try {
      const menu = await MenuService.updateMenu(menuState.id, {
        name: values.name,
        photo: values.photo || null,
      });
      dispatch(modifyMenu({ ...menu, isAdmin: true }));
      showToast({ message: 'Menú actualizado exitosamente', type: 'success' });
    } catch (error) {
      showToast({
        message: 'Error al intentar actualizar menú',
        type: 'error',
      });
    } finally {
      setShowModal(false);
    }
  };

  const buildForm = () => {
    setShowModal(true);
    setForm(
      <Form
        inputs={[
          {
            label: 'Nombre',
            initialValue: { name: menuState.name },
            type: 'text',
            placeholder: 'Menú de cosmo burguer',
          },
          {
            label: 'Foto',
            initialValue: { photo: menuState.photo || '' },
            type: 'text',
            required: false,
            multiline: true,
          },
        ]}
        onAction={updateMenu}
      />
    );
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Wrapper>
          <Paragraph text={'Configuraciones'} variant="h5" />
          <Grid container sx={{ py: 2 }} columnSpacing={4} rowSpacing={4}>
            <Grid item xl={2} lg={3} sm={6} xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
                <Paragraph text={menuState.name} color="primary" variant="h4" />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    py: 2,
                    ...(lessToSm && { alignItems: 'center' }),
                  }}
                >
                  <Image
                    img={
                      'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    }
                    size={280}
                  />
                </Box>
                <Button
                  title="Cambiar"
                  onClick={() => buildForm()}
                  style={{
                    my: 2,
                    ':hover': { bgcolor: 'black' },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Wrapper>
      </Box>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Menú">
        {form}
      </Modal>
    </>
  );
};
