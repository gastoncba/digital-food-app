export const StorageService = (() => {
  const saveToken = (at: string) => {
    sessionStorage.setItem('at', at);
  };

  const deleteTokens = () => {
    sessionStorage.removeItem('at');
  };

  const getTokens = () => {
    const at = sessionStorage.getItem('at');
    if (!at) {
      throw newError('TOKENS-NOT-FOUND', 'NO HAY TOKEN');
    }
    return at;
  };

  type StorageServiceError = 'TOKENS-NOT-FOUND';

  const newError = (code: StorageServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { saveToken, deleteTokens, getTokens };
})();
