import { Menu } from '../models';
import { get } from './Fetch.service';

const SERVICE_ENDPOINT = 'menus';

export const MenuService = (() => {
  const getMenu = async () => {
    try {
      const menu: Menu = await get(SERVICE_ENDPOINT);
      return menu;
    } catch (error) {
      throw newError('GET-MENU-FAIL', error);
    }
  };

  type MenuServiceError = 'GET-MENU-FAIL';

  const newError = (code: MenuServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { getMenu };
})();
