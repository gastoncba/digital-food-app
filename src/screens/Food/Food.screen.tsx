import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  Paragraph,
  Banner,
  IconButton,
  Icon,
  showToast,
  Modal,
  Loader,
  Form,
  GridList,
  Card,
} from '../../components';
import { Food, Section } from '../../models';
import { FoodService } from '../../services';

interface CustomizedState {
  section: Section;
}

interface FoodProps {}

export const FoodScreen: React.FC<FoodProps> = () => {
  const location = useLocation();
  const state: CustomizedState = location.state;
  const { section } = state;
  const [foods, setFoods] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form, setForm] = useState<JSX.Element | null>(null);

  const getFoods = async () => {
    setIsLoading(true);
    try {
      const foods = await FoodService.getFoods(section.id);
      setFoods(foods);
      setIsLoading(false);
    } catch (error) {
      showToast({ message: 'Error al cargar las comidas', type: 'error' });
    }
  };

  const createFood = async (values: Food) => {
    try {
      const { name, description, price, ingredients, photo } = values;
      await FoodService.createFood({
        name,
        description,
        price,
        ingredients: ingredients || null,
        photo: photo || null,
        sectionId: section.id,
      });
      getFoods();
      showToast({ message: 'Comida creada con éxito', type: 'success' });
    } catch (error) {
      showToast({ message: 'Error al crear comida', type: 'error' });
    } finally {
      setShowModal(false);
    }
  };

  const updateFood = async (values: Food) => {
    try {
      const { id, name, description, price, ingredients, photo } = values;
      await FoodService.updateFood(id, {
        name,
        description,
        ingredients: ingredients || null,
        price,
        photo: photo || null,
      });
      getFoods();
      showToast({ message: 'Comida actualizada con éxito', type: 'success' });
    } catch (error) {
      showToast({ message: 'Error al actualizar comida', type: 'error' });
    } finally {
      setShowModal(false);
    }
  };

  const deleteFood = async (foodId: number) => {
    try {
      await FoodService.deleteFood(foodId);
      getFoods();
      showToast({ message: 'Comida eliminada con éxito', type: 'success' });
    } catch (error) {
      showToast({ message: 'Error al eliminar comida', type: 'error' });
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  const buildForm = (item: any, action: (value: any) => Promise<void>) => {
    setShowModal(true);
    setForm(
      <Form
        inputs={[
          {
            label: 'Nombre',
            type: 'text',
            initialValue: { name: item.name || '' },
            constrain: 'Nombre de la comida es requerido',
          },
          {
            label: 'Descripción',
            type: 'text',
            initialValue: { description: item.description || '' },
            multiline: true,
            constrain: 'Descripción es requerida',
          },
          {
            label: 'Ingredientes',
            type: 'text',
            initialValue: { ingredients: item.ingredients || '' },
            multiline: true,
            constrain: 'Ingredientes es requerido',
            required: false,
          },
          {
            label: 'Precio',
            type: 'float',
            initialValue: { price: item.price || 20 },
            min: 10,
            max: 99999,
            constrain: 'El precio es requerido',
          },
          {
            label: 'Foto',
            type: 'text',
            initialValue: { photo: item.photo || '' },
            multiline: true,
            constrain: 'La foto es requerida',
            maxCharacters: 200,
            required: false,
          },
        ]}
        onAction={(values: any) => action({ ...item, ...values })}
      />
    );
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Banner
          title={section.name}
          height={250}
          imageUrl="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <Box sx={{ display: 'flex', columnGap: 3, alignItems: 'baseline' }}>
          <Paragraph text={'Comidas'} variant="h3" sx={{ py: 2 }} />
          <IconButton
            icon={<Icon type="PLUS" sx={{ color: 'white' }} />}
            size="small"
            onClick={() => buildForm({}, createFood)}
            buttonStyle={{
              bgcolor: 'primary.main',
              ':hover': { bgcolor: 'primary.main' },
            }}
          />
        </Box>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {foods.length !== 0 ? (
              <Box>
                <GridList
                  items={foods}
                  renderItem={(item: Food) => (
                    <Card
                      title={item.name}
                      coverImage={item.photo}
                      settingIcons={{
                        onUpdate: () => buildForm(item, updateFood),
                        onDelete: () =>
                          showToast({
                            message: 'Desea eliminar esta comida ? ',
                            type: 'confirmation',
                            confirmOptions: {
                              confirm: {
                                onClick: () => deleteFood(item.id),
                                title: 'Eliminar',
                              },
                            },
                          }),
                      }}
                    />
                  )}
                />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', columnGap: 1, py: 1 }}>
                <Paragraph variant="h6" text={'La sección'} />
                <Paragraph variant="h6" color="primary" text={section.name} />
                <Paragraph variant="h6" text={'no tiene comidas'} />
              </Box>
            )}
          </>
        )}
      </Box>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Comida"
      >
        {form}
      </Modal>
    </>
  );
};
