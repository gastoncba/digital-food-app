import { Section } from '../models';
import { del, get, post, put } from './Fetch.service';

const SERVICE_ENDPOINT = 'sections';

interface CreateSectionDto {
  name: string;
  menuId: number;
}

interface UpdateSectionDto {
  name: string;
}

export const SectionService = (() => {
  const getSections = async (menuId: number, queryParams?: string) => {
    try {
      const sections: Section[] = await get(
        SERVICE_ENDPOINT + '/menu/' + menuId,
        queryParams,
        false
      );
      return sections;
    } catch (error) {
      throw newError('GET-SECTION-FAIL', error);
    }
  };

  const createSection = async (newSection: CreateSectionDto) => {
    try {
      const section: Section = await post(SERVICE_ENDPOINT, newSection);
      return section;
    } catch (error) {
      throw newError('POST-SECTION-FAIL', error);
    }
  };

  const deleteSection = async (sectionId: number) => {
    try {
      await del(SERVICE_ENDPOINT + '/' + sectionId);
    } catch (error) {
      throw newError('DELETE-SECTION-FAIL', error);
    }
  };

  const updateSection = async (
    sectionId: number,
    changes: UpdateSectionDto
  ) => {
    try {
      const section: Section = await put(
        SERVICE_ENDPOINT + '/' + sectionId,
        changes
      );
      return section;
    } catch (error) {
      throw newError('PUT-SECTION-FAIL', error);
    }
  };

  type SectionServiceError =
    | 'GET-SECTION-FAIL'
    | 'POST-SECTION-FAIL'
    | 'PUT-SECTION-FAIL'
    | 'DELETE-SECTION-FAIL';

  const newError = (code: SectionServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { createSection, getSections, updateSection, deleteSection };
})();
