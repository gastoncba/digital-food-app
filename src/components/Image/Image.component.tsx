import React from 'react';
import { Avatar } from '@mui/material';

interface ImageProps {
  img: string;
  size?: number;
  styles?: React.CSSProperties;
}

export const Image: React.FC<ImageProps> = ({ img, size = 100, styles }) => {
  return (
    <Avatar
      alt="imagen"
      src={img}
      style={{ width: size, height: size, ...styles }}
    />
  );
};
