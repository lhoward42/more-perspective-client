// styled.d.ts
import 'styled-components';
interface IPalette {
  main: string
  contrastText: string
}
declare module 'styled-components' {
  export interface DefaultTheme {
    light: {
      primaryDark: string,
      primaryLight: string,
      primaryHover: string,
      mobile: string,
      },
    dark: {
      primaryDark: string,
      primaryLight: string,
      primaryHover: string,
      mobile: string,
    }
   }
}