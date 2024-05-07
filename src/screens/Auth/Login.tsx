import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Form, Paragraph, showToast } from '../../components';
import { AuthService } from '../../services';
import { createMenu } from '../../redux/states';

interface LoginProps {}

interface LoginValues {
  key: string;
}

export const Login: React.FC<LoginProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values: LoginValues) => {
    try {
      const result = await AuthService.login(values);
      dispatch(createMenu(result.menu));
      navigate('/admin/home');
    } catch (error) {
      showToast({ message: 'Error al intentar ingresar', type: 'error' });
    }
  };

  return (
    <>
      <Paragraph
        variant="h3"
        text={'¡Qué bueno volverte a ver!'}
        color="primary"
      />
      <Form
        title={{
          text: 'Ingresa el código de tu menú',
          variant: 'h5',
          align: 'left',
          styles: { fontSize: 25, my: 2 },
        }}
        inputs={[
          {
            type: 'text',
            label: 'Código',
            constrain: 'El código es necesario',
            initialValue: { key: '' },
            placeholder: 'ZZZ.ZZZ.ZZZ',
            maxCharacters: 20,
          },
        ]}
        submitText="Guardar"
        onAction={login}
      />
    </>
  );
};
