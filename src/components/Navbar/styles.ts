import { SxProps, Theme } from '@mui/material';

export const iconStyles: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  lineHeight: 1,
  userSelect: 'none',
  cursor: 'pointer',
  borderRadius: '8px',
  width: '32px',
  height: '32px',
  fontSize: '1.2rem',
  overflow: 'hidden',
};

export const ParagraphStyles: SxProps<Theme> = {
  color: 'black',
  transition: 'all 0.2s ease-in-out ',
};

export const buttonStyles: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  lineHeight: 1,
  userSelect: 'none',
  cursor: 'pointer',
  borderRadius: '8px',
};
