import styled from 'styled-components';
import { theme } from '../GlobalStyles/Theme';

type PassedProps = {
  open: boolean
  colorMode: any
}

export const StyledMenu = styled.nav<PassedProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ colorMode }) => colorMode ? theme.light.menuBackground : theme.dark.menuBackground};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};

  @media (max-width: ${({ colorMode }) => colorMode ? theme.light.mobile : theme.dark.mobile}) {
    width: 100%;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ colorMode }) => colorMode ? theme.light.primaryLight : theme.dark.primaryLight };
    text-decoration: none;
    transition: color 0.3s linear;
    
    @media (max-width: ${({ colorMode }) => colorMode ? theme.light.mobile : theme.dark.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ colorMode }) => colorMode ? theme.light.primaryHover : theme.dark.primaryHover};
    }
  }
`;
