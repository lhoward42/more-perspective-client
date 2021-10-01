import React, { Component } from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { bool } from "prop-types";
import { StyledMenu } from "./Menu.styled";
import Portal from "../Auth/Portal";
import SearchNews from "../Search/index";
import Profile from "../Profile/Entries";


type SideNavProps = {
  token: string | null;
  logout(): void;
  newToken(newToken: string): void;
  isOpen: boolean;
  setOpen(): void;
  colorMode: boolean;
};
type SideNavState = {};

class SideNav extends Component<SideNavProps, SideNavState> {
  render() {
    const { token, isOpen, colorMode } = this.props;
    return (
      <>
        <Router>
          <StyledMenu open={isOpen} colorMode={colorMode}>
            <Link to='/'>
              <span>Home</span>
            </Link>
            <Link to='/news'>
              <span>News</span>
            </Link>
            {token ? (
              <Link to='/profile'>
                <span>Profile</span>
              </Link>
            ) : (
              <></>
            )}
            {token ? (
              <Link to='/'>
                <span onClick={this.props.logout}>Logout</span>
              </Link>
            ) : (
              <Link to='/Portal'>
                <span>Login</span>
              </Link>
            )}
          </StyledMenu>

          <Switch>
            <Route exact path='/'>
              {/* <Home /> */}
            </Route>
            <Route exact path='/portal'>
              <Portal
                token={token}
                newToken={this.props.newToken}
                logout={this.props.logout}
              />
            </Route>
            <Route exact path='/news'>
              <SearchNews colorMode={colorMode} token={token} />
            </Route>

            <Route exact path='/viewStory'>
              {/* <Story /> */}
            </Route>
            <Route exact path='/profile'>
              <Profile token={token} />
            </Route>
            <Route exact path='/viewEntry'>
              {/* <Entry /> */}
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default SideNav;
