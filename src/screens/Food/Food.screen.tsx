import { Box } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { Paragraph, Banner } from '../../components';
import { Section } from '../../models';

interface CustomizedState {
  section: Section;
}

interface FoodProps {}

export const FoodScreen: React.FC<FoodProps> = () => {
  const location = useLocation();
  const state: CustomizedState = location.state;
  const { section } = state;

  return (
    <Box sx={{ p: 2 }}>
      <Banner
        title={section.name}
        height={250}
        imageUrl="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <Paragraph text={'Comidas'} variant="h3" sx={{ py: 2 }} />
    </Box>
  );
};
