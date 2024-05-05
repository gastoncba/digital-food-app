import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, useMediaQuery, Theme } from '@mui/material';

import {
  Card,
  Collapse,
  Icon,
  IconButton,
  Loader,
  Paragraph,
  showToast,
} from '../../components';
import { FoodService } from '../../services';
import { Food } from '../../models';

interface FoodDetailProps {}

interface CustomizedState {
  foodId: number;
  foodName: string;
}

const FoodEmpty: Food = {
  id: 0,
  name: '',
  description: '',
  ingredients: null,
  price: 0,
  photo: '',
};

export const FoodDetail: React.FC<FoodDetailProps> = () => {
  const location = useLocation();
  const state: CustomizedState = location.state;
  const { foodId, foodName } = state;
  const [food, setFood] = useState<Food>(FoodEmpty);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  useEffect(() => {
    const getFood = async () => {
      try {
        const food = await FoodService.getFood(foodId);
        setFood(food);
        setIsLoading(false);
      } catch (error) {
        showToast({
          message: 'Error al cargar la comida' + foodName,
          type: 'error',
        });
      }
    };

    getFood();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader sx={{ py: 2 }} />
      ) : (
        <Box sx={{ width: isMd ? '30%' : isSm ? '50%' : '100%', p: 2 }}>
          <Card title={foodName} coverImage={food.photo}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 1,
                py: 1,
              }}
            >
              <Paragraph text={`$ • ${food.price}`} />
              <Paragraph color="GrayText" text={food.description} />
              {food.ingredients && (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Paragraph
                      text={'Ingredientes'}
                      sx={{ fontWeight: 'bold' }}
                    />
                    <IconButton
                      icon={<Icon type="EXPAND-MORE" />}
                      onClick={() => setExpanded(!expanded)}
                    />
                  </Box>
                  <Collapse expanded={expanded}>
                    <Paragraph
                      color="GrayText"
                      text={food.ingredients || 'No hay ingrendientes'}
                    />
                  </Collapse>
                </>
              )}
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
};
