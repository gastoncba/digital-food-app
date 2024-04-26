import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Router } from './Router.routes';
import { Loader } from '../components';
import { MenuService } from '../services';
import { createMenu } from '../redux/states';

interface Props {}

export const RoutesController: React.FunctionComponent<Props> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMenu = async () => {
      try {
        const menu = await MenuService.getMenu();
        dispatch(createMenu(menu));
      } finally {
        setIsLoading(false);
      }
    };

    getMenu();
  }, []);

  return <>{isLoading ? <Loader sx={{ py: 2 }} /> : <Router />}</>;
};
