import styled from "styled-components";
import { theme } from "../GlobalStyles/Theme";

type PassedProps = {
  open: boolean;
  colorMode: boolean;
};

export const StyledMenu = styled.nav<PassedProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
  background: ${(props) =>
    props.colorMode ? theme.light.menuBackground : theme.dark.menuBackground};

  height: 100%;
  text-align: left;
  padding: 2rem;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.open ? "translateX(0)" : "translateX(-100%)")};

  @media (max-width: ${(props) =>
      props.open ? theme.light.mobile : theme.dark.mobile}) {
    width: 100%;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${(props) => (props.open ? "white" : "white")};
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${(props) =>
        props.colorMode ? theme.light.mobile : theme.dark.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${(props) => (props.open ? "#343a40" : "#343a40")};
    }
  }
`;
