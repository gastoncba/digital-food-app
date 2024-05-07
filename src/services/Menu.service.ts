import { Menu } from '../models';
import { MenuEmptyState } from '../redux/states';
import { API } from '../settings';
import { get, post } from './Fetch.service';
import { StorageService } from './private/Storage.service';

const SERVICE_ENDPOINT = 'menus';

export const MenuService = (() => {
  const getMenu = async () => {
    let menu = MenuEmptyState;
    try {
      const token = StorageService.getTokens();
      if (token.split('=')[0] !== 'CODE-MENU') {
        menu = await get(SERVICE_ENDPOINT);
        menu.isAdmin = true;
      } else {
        const id = Number.parseInt(token.split('=')[1]);
        menu = await getMenuById(id);
      }

      return menu;
    } catch (error) {
      throw newError('GET-MENU-FAIL', error);
    }
  };

  const getMenuById = async (menuId: number) => {
    try {
      const menu: Menu = await get(
        SERVICE_ENDPOINT + '/' + menuId,
        undefined,
        false,
        { 'x-api-key': API.API_KEY }
      );
      menu.isAdmin = false;
      StorageService.saveToken('CODE-MENU=' + menuId);
      return menu;
    } catch (error) {
      throw newError('GET-MENU-BY-ID-FAIL', error);
    }
  };

  const createMenu = async (newMenu: {
    name: string;
    photo: string | null;
  }) => {
    try {
      const result: { menu: Menu; key: string } = await post(
        SERVICE_ENDPOINT,
        newMenu,
        false
      );
      return result;
    } catch (error) {
      throw newError('POST-MENU-FAIL', error);
    }
  };

  type MenuServiceError =
    | 'GET-MENU-FAIL'
    | 'GET-MENU-BY-ID-FAIL'
    | 'POST-MENU-FAIL';

  const newError = (code: MenuServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { getMenu, getMenuById, createMenu };
})();
