import { get } from './Fetch.service';

const SERVICE_ENDPOINT = 'sections';

export const SectionService = (() => {
  const getSection = async () => {
    try {
      const sections = await get(SERVICE_ENDPOINT);
    } catch (error) {
      throw newError('SECTION-GET-FAIL', error);
    }
  };

  type SectionServiceError = 'SECTION-GET-FAIL';

  const newError = (code: SectionServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };
})();
