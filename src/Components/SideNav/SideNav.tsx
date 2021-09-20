import React, { Component } from "react";
import {Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled'



type SideNavProps = {
    token: string | null,
    logout(): void,
    newToken(newToken: string ): void,
    isOpen: boolean, 
    setOpen(): void
}
type SideNavState = {
    token: string
}

class SideNav extends Component<SideNavProps,SideNavState> {

    render(){
        const { token, isOpen } = this.props
        return(
            <>
            <Router>
            <StyledMenu open={isOpen} >
                <Link to="/">
                    <span>Home</span>
                </Link>
                <Link to="/news">
                    <span>News</span>
                </Link>
                {token ? <Link to="/profile">
                    <span>Profile</span>
                </Link> : <></>}
                {token ? <Link to="/"><span onClick={this.props.logout}>Logout</span></Link> : <Link to="/Portal"><span>Login</span></Link>}
                
            </StyledMenu>
            
            <Switch>
          <Route exact path="/">
              {/* <Home /> */}
          </Route>
          <Route exact path="/portal">
              {/* <Portal /> */}
          </Route>
          <Route exact path="/news">
              {/* <News /> */}
          </Route>
         
          <Route exact path="/viewStory">
              {/* <Story /> */}
          </Route> 
          <Route exact path="/profile">
             {/* <Profile />  */}
          </Route>
          <Route exact path="/viewEntry">
              {/* <Entry /> */}
          </Route>
            </Switch>
            </Router>  
            </>
        )
    }
}

export default SideNav