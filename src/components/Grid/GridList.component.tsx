import React from 'react';
import { Theme, SxProps, Grid } from '@mui/material';

interface Props {
  items: any[];
  renderItem: (item: any) => JSX.Element;
  sxContainer?: SxProps<Theme>;
  sxItem?: SxProps<Theme>;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  rowSpacing?: number;
  columnSpacing?: number;
}

export const GridList: React.FC<Props> = (props: Props) => {
  return (
    <Grid
      sx={props.sxContainer}
      container
      direction="row"
      //justifyContent="center"
      //alignItems="flex-start"
      rowSpacing={props.rowSpacing || 1}
      columnSpacing={props.columnSpacing || 2}
    >
      {props.items.map((item, key) => {
        return (
          <Grid
            item
            xs={props.xs || 12}
            sm={props.sm || 6}
            md={props.md || 6}
            lg={props.lg || 4}
            xl={props.xl || 4}
            sx={props.sxItem}
            key={key}
          >
            {props.renderItem(item)}
          </Grid>
        );
      })}
    </Grid>
  );
};
