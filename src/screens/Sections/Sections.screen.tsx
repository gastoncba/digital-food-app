import { Box } from '@mui/material';
import { Paragraph } from '../../components';

interface SectionProps {}

export const SectionScreen: React.FC<SectionProps> = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Paragraph text={'Secciones'} variant="h2" />
    </Box>
  );
};
