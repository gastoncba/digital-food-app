import { Form, Paragraph } from '../../components';

interface SignupProps {}

export const Signup: React.FC<SignupProps> = () => {
  const signup = async () => {};
  return (
    <>
      <Paragraph variant="h3" text={'Bienvenido!'} />
      <Paragraph
        text={'Ingrese el nombre de su menu'}
        sx={{ py: 2 }}
        color="GrayText"
      />
      <Form
        inputs={[
          {
            label: 'Nombre',
            type: 'text',
            initialValue: { name: '' },
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
  );
};
