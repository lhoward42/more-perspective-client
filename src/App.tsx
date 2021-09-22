import React, { Component } from "react";
import { Link, Route, Switch, Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./Components/GlobalStyles/Global";
import { theme } from "./Components/GlobalStyles/Theme";
import Burger from "./Components/Burger";
import SideNav from "./Components/SideNav/SideNav";
import "./App.css";

type AppProps = {};
type AppState = {
  token: string | null;
  open: boolean;
  color: boolean;
};

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      token: "",
      open: false,
      color: true,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({
        token: localStorage.getItem("token"),
      });
    }
  }

  updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    this.setState({
      token: newToken,
    });
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({
      token: "",
    });
  };

  colorModeToggle = () => {
    this.setState({ color: !this.state.color });
  };

  navToggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { token, open, color } = this.state;
    return (
      <>
        <ThemeProvider theme={theme}>
          <input type='submit' onClick={() => this.colorModeToggle()} />

          <GlobalStyles color={color} />

          <SideNav
            color={color}
            isOpen={open}
            setOpen={this.navToggle}
            token={token}
            logout={this.clearToken}
            newToken={this.updateToken}
          />
          <Burger isOpen={open} setOpen={this.navToggle} />
        </ThemeProvider>
      </>
    );
  }
}

export default App;
