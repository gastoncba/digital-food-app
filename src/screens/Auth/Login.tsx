import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Form, Paragraph } from '../../components';
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
    const result = await AuthService.login(values);
    dispatch(createMenu(result.menu));
    navigate('/admin/home');
  };

  return (
    <>
      <Paragraph variant="h3" text={'Que bueno volverte a ver !'} />
      <Paragraph
        text={'Ingresa el código de tu menu'}
        variant="h5"
        sx={{ py: 2 }}
      />
      <Form
        inputs={[
          {
            type: 'text',
            label: 'Codigo',
            constrain: 'El código es necesario',
            initialValue: { key: '' },
          },
        ]}
        submitText="Guardar"
        onAction={login}
      />
    </>
  );
};
