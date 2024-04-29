import { SxProps, Theme } from '@mui/material';

export const wrapperStyles: SxProps<Theme> = {
  position: 'absolute',
  flexDirection: 'row',
  top: '5px',
  borderRadius: 30,
  width: '50%',
  right: '24%',
  transform: 'translateX(-50%)',
  transition: 'all 0.6s ease-in-out',
  background: 'transparent',
};

export const iconButtonStyles: SxProps<Theme> = {
  bgcolor: 'white',
  opacity: 0,
  transition: 'opacity 1s ease-in-out',
};

export const mainIconButtonStyles: SxProps<Theme> = {
  bgcolor: 'white',
  ':hover': { bgcolor: 'white' },
};
