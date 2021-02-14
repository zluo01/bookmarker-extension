import { DefaultTheme } from 'styled-components';

export const DARK = 'DARK';
export const LIGHT = 'LIGHT';

export const lightTheme: DefaultTheme = {
  body: '#E2E2E2',
  text: '#363537',

  button: {
    backgroundColor: '#6200EE',
    hoverColor: 'rgba(98,0,238,0.8)',
  },
  contentHover: {
    color: '#ff0000',
    backgroundColor: '#ffc0cb',
  },
};

export const darkTheme: DefaultTheme = {
  body: '#363537',
  text: '#FAFAFA',

  button: {
    backgroundColor: '#bb86fc',
    hoverColor: 'rgba(187, 134, 252, 0.8)',
  },
  contentHover: {
    color: '#FAFAFA',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
};
