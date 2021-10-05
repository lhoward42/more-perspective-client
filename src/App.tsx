import React, { Component } from "react";
import { ThemeProvider } from "styled-components/";
import { GlobalStyles } from "./Components/GlobalStyles/Global";
import { theme } from "./Components/GlobalStyles/Theme";
import Burger from "./Components/Burger";
import SideNav from "./Components/SideNav/SideNav";
import { Container } from "reactstrap";
import "./App.css";

type AppProps = {};
type AppState = {
  token: string | null;
  open: boolean;
  colorMode: boolean;
};

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      token: "",
      open: false,
      colorMode: true,
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
    this.setState({ colorMode: !this.state.colorMode });
  };

  navToggle = () => {
    this.setState({ open: !this.state.open });
  };

  closeNav = () => {
    this.setState({ open: false });
  };

  render() {
    const { token, open, colorMode } = this.state;
    return (
      <Container className='ms-5 mx-5'>
        <Container className='theme-switch-wrapper d-flex justify-content-center mx mt-3 my-3 py-3 px-4'>
          <em className='switchfont me-2 px-3'>Conservative News Sources</em>
          <label className='theme-switch'>
            <input
              type='checkbox'
              id='checkbox'
              onClick={() => this.colorModeToggle()}
            />
            <div className='slider round'></div>
          </label>
          <em className='switchfont ms-2 px-3'>Liberal News Sources</em>
        </Container>
        <ThemeProvider theme={theme}>
          <GlobalStyles color={colorMode} />
          <div className=''>
            <SideNav
              colorMode={colorMode}
              isOpen={open}
              setOpen={this.navToggle}
              token={token}
              logout={this.clearToken}
              newToken={this.updateToken}
              closeNav={this.closeNav}
            />
          
          <div className='mx-auto'>
            <Burger
              colorMode={colorMode}
              isOpen={open}
              setOpen={this.navToggle}
            />
          </div>
          </div>
        </ThemeProvider>
      </Container>
    );
  }
}

export default App;
