import * as styledComponents from "styled-components/native"

import DefaultTheme from './styled'

const darkMode = {
    primaryDark: '#0D0C1D',
    primaryLight: '#EFFFFA',
    primaryHover: '#343078',
    menuBackground:'pink',
    mobile: '576px',
  }

  const lightMode = {
    primaryDark: '#CF0000',
    primaryLight: '#0D0C1D',
    primaryHover: 'white',
    menuBackground: 'green',
    mobile: '576px',
  }

  export const theme = {
    dark: darkMode,
    light: lightMode
  }
