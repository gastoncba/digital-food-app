import { Box } from '@mui/material';

import { Paragraph } from '../../components';

interface NotFoundScreenProps {
  message?: string;
}

export const NotFoundScreen: React.FC<NotFoundScreenProps> = ({
  message = 'Ups! no hay nada aquí',
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, py: 2 }}>
      <Paragraph
        text="404 - Página no encontrada"
        variant="h3"
        align="center"
        color="primary"
      />
      <Paragraph text={message} align="center" variant="h5" />
    </Box>
  );
};
