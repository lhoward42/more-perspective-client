import React, { Component } from 'react';
import { StyledBurger } from './Burger.styled';

type PassedProps = {
  isOpen: boolean
  setOpen(): void
  colorMode: boolean
  
}

class Burger extends Component<PassedProps, {}> {

 

  render(){
    const { isOpen, setOpen, colorMode } = this.props
  return (
    <StyledBurger aria-expanded={ isOpen ? true : false } open= {isOpen} onClick={() => setOpen()} colorMode={colorMode} >
      <span />
      <span />
      <span />
    </StyledBurger>
  )
}
}

export default Burger 