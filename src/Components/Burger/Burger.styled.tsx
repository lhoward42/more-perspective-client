import styled from 'styled-components';

type PassedProps = {
  open: boolean
  colorMode: any
}

export const StyledBurger = styled.button<PassedProps>`
  position: fixed;
  top: 3%;
  left: .5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  
  span {
    width: 2rem;
    height: 0.25rem;
    background: ${(props) => (props.open ? "white" : "grey" )};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    :first-child {
      transform: ${(props) => (props.open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    :nth-child(2) {
      opacity: ${(props) => (props.open ? '0' : '1')};
      transform: ${(props) => (props.open ? 'translateX(20px)' : 'translateX(0)')};
    }
    :nth-child(3) {
      transform: ${(props) => (props.open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;