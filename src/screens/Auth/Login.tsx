import { useSelector, useDispatch } from 'react-redux';

import { Form, Paragraph } from '../../components';
import { AuthService } from '../../services';
import { AppStore } from '../../redux/store';
import { createMenu } from '../../redux/states';

interface LoginProps {}

interface LoginValues {
  key: string;
}

export const Login: React.FC<LoginProps> = () => {
  const menuState = useSelector((store: AppStore) => store.menu);
  const dispatch = useDispatch();

  const login = async (values: LoginValues) => {
    const result = await AuthService.login(values);
    dispatch(createMenu(result.menu));
  };

  return (
    <>
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
      <Paragraph text={'menu: ' + menuState.name} />
    </>
  );
};
