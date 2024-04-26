import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Drawer } from '@mui/material';

import { sidebarStyles } from './styles';

interface PropsSidebar {
  children: React.ReactNode;
  show: boolean;
  variant?: 'permanent' | 'persistent' | 'temporary';
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  onClose?: () => void;
  top?: number | string;
  width?: number | string;
  scrollHeight?: string | number;
}

export const Sidebar: React.FC<PropsSidebar> = ({
  children,
  variant = 'persistent',
  show,
  anchor = 'right',
  onClose,
  width,
  top,
  scrollHeight,
}) => {
  return (
    <Drawer
      variant={variant}
      open={show}
      anchor={anchor}
      onClose={onClose}
      sx={{
        [`& .MuiDrawer-paper`]: {
          ...sidebarStyles,
          top: top || '0px',
          width: width || 240,
        },
        '& .MuiBackdrop-root': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <PerfectScrollbar component="div" style={{ height: scrollHeight }}>
        {children}
      </PerfectScrollbar>
    </Drawer>
  );
};
