import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { MenuService } from '../../services';
import { Button, Loader, Paragraph, showToast } from '../../components';
import { Menu } from '../../models';
import { Box } from '@mui/material';
import { createMenu } from '../../redux/states';

interface MenuProps {}

const MenuEmpty: Menu = {
  id: 0,
  name: '',
  photo: null,
  isAdmin: false,
};

export const MenuScreen: React.FC<MenuProps> = () => {
  const { menuId, name } = useParams();
  const [menu, setMenu] = useState<Menu>(MenuEmpty);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getMenu = async () => {
      try {
        if (menuId) {
          const id = Number.parseInt(menuId);
          const menu = await MenuService.getMenuById(id);
          dispatch(createMenu(menu));
          setMenu(menu);
          setIsLoading(false);
        } else {
          showToast({
            message: 'Error al traer menu de ' + name,
            type: 'error',
          });
        }
      } catch (error) {
        showToast({ message: 'Error al traer menu de ' + name, type: 'error' });
      }
    };

    getMenu();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader sx={{ py: 2 }} />
      ) : (
        <Box>
          <Paragraph text={menu.name} variant="h5" />
          <Button
            title="ver menu"
            onClick={() =>
              navigate('/app/sections', { state: { isAdmin: false, menuId } })
            }
          />
        </Box>
      )}
    </>
  );
};
