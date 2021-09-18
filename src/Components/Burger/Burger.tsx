import React, { Component } from 'react';
import { StyledBurger } from './Burger.styled';

type PassedProps = {
  isOpen: boolean
  setOpen(): void
}

class Burger extends Component<PassedProps, {}> {

 

  render(){
    const { isOpen, setOpen } = this.props
  return (
    <StyledBurger aria-expanded={ isOpen ? true : false } open= {isOpen} onClick={() => setOpen()}>
      <span />
      <span />
      <span />
    </StyledBurger>
  )
}
}

export default Burger 