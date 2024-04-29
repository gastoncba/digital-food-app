import { useState, useEffect } from 'react';
import { Box, useMediaQuery, Theme } from '@mui/material';

import { Icon } from '../Icon/Icon.component';
import { IconButton } from '../IconButton/IconButton.component';
import {
  wrapperStyles,
  iconButtonStyles,
  mainIconButtonStyles,
} from './styles';

interface SettingCardProps {
  onUpdate: () => void;
  onDelete: () => void;
  onSettingOver: (over: boolean) => void;
}

export const SettingCard: React.FC<SettingCardProps> = ({
  onUpdate,
  onDelete,
  onSettingOver,
}) => {
  const [menu, toggleMenu] = useState<boolean>(false);
  const [timer, setTimer] = useState<boolean>(false);
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.up('xs'));

  useEffect(() => {
    if (menu) {
      setTimeout(() => {
        setTimer(true);
      }, 1000);
    } else {
      setTimer(false);
    }
    onSettingOver(menu);
  }, [menu]);

  return (
    <Box
      onMouseOver={() => toggleMenu(true)}
      onMouseLeave={() => toggleMenu(false)}
      sx={{
        ...wrapperStyles,
        ...(isXs && { width: '37%', right: '43%' }),
        ...(menu && {
          background: 'white',
        }),
      }}
    >
      <Box sx={{ display: 'flex', columnGap: 1 }}>
        <IconButton
          buttonStyle={mainIconButtonStyles}
          size="small"
          icon={<Icon type="MORE-HORIZONT" sx={{ color: 'black' }} />}
        />
        {timer && (
          <>
            <IconButton
              buttonStyle={{
                ...iconButtonStyles,
                ...(menu && { opacity: 1 }),
              }}
              onClick={onUpdate}
              size="small"
              icon={<Icon type="EDIT" sx={{ color: 'black' }} />}
            />
            <IconButton
              buttonStyle={{
                ...iconButtonStyles,
                ...(menu && { opacity: 1 }),
              }}
              onClick={onDelete}
              size="small"
              icon={<Icon type="DELETE" sx={{ color: 'black' }} />}
            />
          </>
        )}
      </Box>
    </Box>
  );
};
