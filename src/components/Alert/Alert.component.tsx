import { Alert as AlertMUI, SxProps, Theme } from '@mui/material';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'standard' | 'filled' | 'outlined';
  severity?: 'error' | 'info' | 'success' | 'warning';
  sx?: SxProps<Theme>;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant,
  severity = 'success',
  sx,
}) => {
  return (
    <AlertMUI variant={variant} severity={severity} sx={sx}>
      {children}
    </AlertMUI>
  );
};
