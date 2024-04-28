import { Box, SxProps, Theme } from '@mui/material';
import React from 'react';

import { Paragraph } from '../Paragraph/Paragraph.component';

interface BannerProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  height?: string | number | 'auto';
  styles?: SxProps<Theme>;
}

export const Banner: React.FC<BannerProps> = ({
  imageUrl,
  title,
  subtitle,
  height = 'auto',
  styles,
}) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        borderRadius: '8px',
        ...styles,
      }}
    >
      <Paragraph text={title} variant="h1" />
      {subtitle && <Paragraph text={subtitle} />}
    </Box>
  );
};
