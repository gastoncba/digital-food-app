import { Box } from '@mui/material';

import { wrapperStyles } from './styles';

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <Box sx={wrapperStyles}>{children}</Box>;
};
