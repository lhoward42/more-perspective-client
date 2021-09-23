import { createGlobalStyle } from 'styled-components';
import { theme } from './Theme';
type PassedProps = {
  color: boolean
}

export const GlobalStyles = createGlobalStyle<PassedProps>`
  html, body {
    margin: 0;
    padding: 0;
  }
  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    align-items: center;
    background: ${ props => props.color === true ? theme.light.primaryDark : theme.dark.primaryDark};
    color: ${props => props.color === true ? theme.light.primaryLight : theme.dark.primaryLight};
    display: flex;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    height: 100vh;
    justify-content: center;
    text-rendering: optimizeLegibility;
  }
  `