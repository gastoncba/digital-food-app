import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { MenuService } from '../../services';
import { Button, Loader, Paragraph, showToast } from '../../components';
import { Menu } from '../../models';
import { Box, Container } from '@mui/material';
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
          dispatch(createMenu({ ...menu, isAdmin: false }));
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
    <Box sx={{ py: 2 }}>
      {isLoading ? (
        <Loader />
      ) : (
        <Container maxWidth={'md'}>
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
            <Paragraph
              text={'Bienvenido al Menú de ' + menu.name}
              variant="h2"
            />
            <Paragraph
              text={
                '¡Entra y mira todos los exquisitos platos que tenemos disponibles!'
              }
              variant="h5"
            />
          </Box>
          <Button
            title="ver menu"
            style={{ my: 2 }}
            onClick={() =>
              navigate('/app/sections', { state: { isAdmin: false, menuId } })
            }
          />
        </Container>
      )}
    </Box>
  );
};
