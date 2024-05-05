import { Food } from '../models';
import { del, get, post, put } from './Fetch.service';

const SERVICE_ENDPOINT = 'foods';

interface CreateFoodDto {
  name: string;
  description: string;
  price: number;
  ingredients: string | null;
  photo: string | null;
  sectionId: number;
}

interface UpdateFoodDto {
  name?: string;
  description?: string;
  price?: number;
  ingredients?: string | null;
  photo?: string | null;
  sectionId?: number;
}

export const FoodService = (() => {
  const getFoods = async (sectionId: number, queryParams?: string) => {
    try {
      const foods: Food[] = await get(
        SERVICE_ENDPOINT + '/section/' + sectionId,
        queryParams,
        false
      );
      return foods;
    } catch (error) {
      throw newError('GET-FOODS-FAIL', error);
    }
  };

  const getFood = async (foodId: number) => {
    try {
      const food: Food = await get(
        SERVICE_ENDPOINT + '/' + foodId,
        undefined,
        false
      );
      return food;
    } catch (error) {
      throw newError('GET-FOOD-DETAIL-FAIL', error);
    }
  };

  const createFood = async (newFood: CreateFoodDto) => {
    try {
      const food = await post(SERVICE_ENDPOINT, newFood);
      return food;
    } catch (error) {
      throw newError('POST-FOODS-FAIL', error);
    }
  };

  const updateFood = async (foodId: number, changes: UpdateFoodDto) => {
    try {
      const food = await put(SERVICE_ENDPOINT + '/' + foodId, changes);
      return food;
    } catch (error) {
      throw newError('PUT-FOODS-FAIL', error);
    }
  };

  const deleteFood = async (foodId: number) => {
    try {
      await del(SERVICE_ENDPOINT + '/' + foodId);
    } catch (error) {
      throw newError('DELETE-FOODS-FAIL', error);
    }
  };

  type FoodServiceError =
    | 'GET-FOODS-FAIL'
    | 'GET-FOOD-DETAIL-FAIL'
    | 'POST-FOODS-FAIL'
    | 'PUT-FOODS-FAIL'
    | 'DELETE-FOODS-FAIL';

  const newError = (code: FoodServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { getFoods, createFood, updateFood, deleteFood, getFood };
})();
