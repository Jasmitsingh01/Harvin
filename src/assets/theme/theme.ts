'use client';
import { createTheme } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

export const lightColors = {
  dominant: '#FFFDFA',
  dominant50: '#F1EFEC',
  accent: '#110F0C',
  accent50: '#31302E',
  compliment: '#BCA987',
};

export type ColorsInterface = typeof lightColors;

// 👇️ type Keys = "name" | "age" | "country"
export type ColorType = keyof typeof lightColors;

const typography: TypographyOptions = {
  fontFamily: ['Albert Sans', 'sans-serif'].join(','),
};

export const lightTheme = createTheme({
  typography,
  colors: lightColors,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: lightColors.accent50,
          backgroundColor: lightColors.dominant,
          position: 'relative',
        },
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface Theme {
    colors: ColorsInterface;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors?: ColorsInterface;
  }
}
