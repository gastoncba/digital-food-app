import React from 'react';
import { Button as MuiButton, SxProps, Theme } from '@mui/material';
import { motion } from 'framer-motion';

export interface ButtonI {
  title?: string;
  onClick: (params?: any) => void;
  variant?: 'contained' | 'outlined' | 'text';
  style?: SxProps<Theme>;
  startIcon?: any;
  onMouseOver?: (params?: any) => any;
  onMouseLeave?: (params?: any) => any;
  color?: 'primary' | 'secondary' | 'inherit';
  disabled?: boolean;
  colorHover?: string;
  animation?: boolean;
}

export const Button: React.FunctionComponent<ButtonI> = (props: ButtonI) => {
  return (
    <>
      {props.animation ? (
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <MuiButton
            sx={{
              bgcolor: 'primary.main',
              borderRadius: '20px',
              px: 5,
              py: 1,
              fontSize: 16,
              ':hover': {
                bgcolor: props.colorHover || 'primary.main',
              },
              ...props.style,
            }}
            variant={props.variant || 'contained'}
            startIcon={props.startIcon}
            onClick={props.onClick}
            onMouseOver={props.onMouseOver}
            onMouseLeave={props.onMouseLeave}
            color={props.color || 'primary'}
            disabled={props.disabled || false}
          >
            {props.title}
          </MuiButton>
        </motion.div>
      ) : (
        <MuiButton
          sx={{
            bgcolor: 'primary.main',
            borderRadius: '20px',
            px: 5,
            py: 1,
            fontSize: 16,
            ':hover': {
              bgcolor: props.colorHover || 'primary.main',
            },
            ...props.style,
          }}
          variant={props.variant || 'contained'}
          startIcon={props.startIcon}
          onClick={props.onClick}
          onMouseOver={props.onMouseOver}
          onMouseLeave={props.onMouseLeave}
          color={props.color || 'primary'}
          disabled={props.disabled || false}
        >
          {props.title}
        </MuiButton>
      )}
    </>
  );
};
