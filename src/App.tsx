import React, { Component } from "react";
import { ThemeProvider } from "styled-components/";
import { GlobalStyles } from "./Components/GlobalStyles/Global";
import { theme } from "./Components/GlobalStyles/Theme";
import Burger from "./Components/Burger";
import SideNav from "./Components/SideNav/SideNav";
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

  render() {
    const { token, open, colorMode } = this.state;
    return (
      <>
        {/* <div className='toggle-div'>
          <input
            className='toggle'
            type='radio'
            onClick={() => this.colorModeToggle()}
          />
        </div> */}

        <div className='theme-switch-wrapper'>
          <label className='theme-switch'>
            <input
              type='checkbox'
              id='checkbox'
              onClick={() => this.colorModeToggle()}
            />
            <div className='slider round'></div>
          </label>
          <em>Enable Dark Mode!</em>
        </div>
        <ThemeProvider theme={theme}>
          <GlobalStyles color={colorMode} />

          <SideNav
            colorMode={colorMode}
            isOpen={open}
            setOpen={this.navToggle}
            token={token}
            logout={this.clearToken}
            newToken={this.updateToken}
          />
          <Burger
            colorMode={colorMode}
            isOpen={open}
            setOpen={this.navToggle}
          />
        </ThemeProvider>
      </>
    );
  }
}

export default App;
