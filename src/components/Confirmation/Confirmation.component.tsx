import { Box } from '@mui/material';

import { themeMaterial } from '../../settings';
import { Button } from '../Button/Button.component';

export interface ConfirmationI {
  description: { title: string; color?: any };
  confirm: { onClick: (params?: any) => any; title?: string; style?: any };
  cancel?: { onClick?: (params?: any) => any; title?: string; style?: any };
  onClose: () => void;
}

export const Confirmation: React.FunctionComponent<ConfirmationI> = ({
  description,
  confirm,
  cancel,
  onClose,
}) => {
  return (
    <Box style={{ width: 'fitContent', margin: 5 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          color: description.color || themeMaterial.palette.text.primary,
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          my: 2,
        }}
      >
        {description.title}
      </Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Button
          onClick={(values) => {
            confirm.onClick(values);
            onClose();
          }}
          title={confirm?.title || 'Confirmar'}
          style={
            confirm?.style || {
              backgroundColor: themeMaterial.palette.success.main,
              ':hover': {
                backgroundColor: themeMaterial.palette.success.main,
              },
              px: 3,
            }
          }
        />
        <Button
          onClick={() => {
            if (cancel?.onClick) {
              cancel?.onClick();
            }
            onClose();
          }}
          title={cancel?.title || 'Cancelar'}
          style={
            cancel?.style || {
              backgroundColor: themeMaterial.palette.warning.main,
              ':hover': {
                backgroundColor: themeMaterial.palette.warning.main,
              },
              px: 3,
            }
          }
        />
      </Box>
    </Box>
  );
};
