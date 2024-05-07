import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {
  Alert,
  Button,
  Form,
  Icon,
  IconButton,
  Paragraph,
  Tooltip,
  showToast,
} from '../../components';
import { AuthService, MenuService } from '../../services';
import { createMenu } from '../../redux/states';
import { GenericsUtils } from '../../utils';

interface SignupValues {
  name: string;
  photo: string;
}

interface SignupProps {}

export const Signup: React.FC<SignupProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [key, setKey] = useState<string>('BOLSA.SOL.HOCHE');
  const [name, setName] = useState<string>('prueba');
  const [showSignup, setShowSignup] = useState<boolean>(true);

  const signup = async (values: SignupValues) => {
    try {
      const { key, menu } = await MenuService.createMenu({
        name: values.name,
        photo: values.photo || null,
      });

      const result = await AuthService.login({ key });
      setKey(key);
      setName(menu.name);

      dispatch(createMenu({ ...result.menu, isAdmin: true }));
      setShowSignup(false);
    } catch (error) {
      showToast({ message: 'Error al intentar crear el menú', type: 'error' });
    }
  };
  return (
    <>
      {showSignup ? (
        <>
          <Paragraph variant="h3" text={'Bienvenido a Digital Food!'} />
          <Form
            title={{
              text: 'Para comenzar, ingresa el nombre de tu menú',
              variant: 'body1',
              align: 'left',
              styles: { fontSize: 17, my: 2 },
              color: 'GrayText',
            }}
            inputs={[
              {
                label: 'Nombre',
                type: 'text',
                initialValue: { name: '' },
                placeholder: 'Menú de CosmoBurguer',
              },
              {
                label: 'Foto',
                type: 'text',
                required: false,
                initialValue: { photo: '' },
                multiline: true,
              },
            ]}
            onAction={signup}
          />
        </>
      ) : (
        <Box>
          <Alert sx={{ border: '1px solid green', borderRadius: '10px' }}>
            <Paragraph
              text={`Tu menú ${name} se ha creado exitosamente`}
              variant="h6"
            />
            <Paragraph
              text={
                'Recuerda la siguiente código para volver a acceder a tu menú y editar las comidas. La clave de acceso es: '
              }
            />
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                columnGap: 1,
              }}
            >
              <Paragraph text={key} variant="h5" />
              <Tooltip text="Copiar" position="right">
                <Box>
                  <IconButton
                    icon={<Icon type="COPY" />}
                    onClick={() => GenericsUtils.writeText(key)}
                  />
                </Box>
              </Tooltip>
            </Box>
          </Alert>
          <Button
            title="aceptar"
            onClick={() => {
              setTimeout(() => {
                navigate('/admin/home');
              }, 1000);
            }}
            style={{ my: 2 }}
          />
        </Box>
      )}
    </>
  );
};
