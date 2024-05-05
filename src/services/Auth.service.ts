import { Menu, Token } from '../models';
import { post } from './Fetch.service';
import { StorageService } from './private/Storage.service';

const SERVICE_ENDPOINT = 'auth';

export const AuthService = (() => {
  const login = async (value: { key: string }) => {
    try {
      const result: { menu: Menu; token: Token } = await post(
        SERVICE_ENDPOINT + '/login',
        value,
        false
      );
      StorageService.saveToken(result.token.access_token);
      result.menu.isAdmin = true;
      return result;
    } catch (error) {
      throw newError('LOGIN-FAIL', error);
    }
  };

  const logout = () => {
    StorageService.deleteTokens();
  };

  type AuthServiceError = 'LOGIN-FAIL';

  const newError = (code: AuthServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { login, logout };
})();
