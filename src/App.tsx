import React, { Component } from 'react';
import {Link, Route, Switch, Router } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './Components/GlobalStyles/Global';
import { theme } from './Components/GlobalStyles/Theme';
import Burger from './Components/Burger';
import SideNav from './Components/SideNav/SideNav';
import './App.css';

type AppProps = {}
type AppState = {
  token: string | null,
  open: boolean
}

class App extends Component<AppProps, AppState >{
constructor(props: AppProps){
  super(props)
  this.state = {
    token: "",
    open: false  
  }
}

componentDidMount(){
  if(localStorage.getItem("token")){
    this.setState({
      token: localStorage.getItem("token")
    })
  } 
}


updateToken = (newToken: string) => {
  localStorage.setItem("token", newToken);
  this.setState({
    token: newToken
  })
}

clearToken = () => {
  localStorage.clear()
  this.setState({
    token: ""
  })
}

navToggle = () => {
  
  this.setState({open: !this.state.open})
}


  render(){
    const { token, open } = this.state
  return (
  <ThemeProvider theme={theme}>
    <>
    <GlobalStyles />
      <SideNav isOpen={open} setOpen={this.navToggle} token={token} logout={this.clearToken} newToken={this.updateToken} />
      <Burger isOpen={open} setOpen={this.navToggle}/> 
    </>
 </ThemeProvider>
    )
  }
}

export default App;
