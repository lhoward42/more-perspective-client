import React, { Component } from "react";
import APIURL from "../../Utils/Environment";
import { Redirect } from "react-router-dom";
import { Card, Input, Button, Form } from 'reactstrap'

type PassedProps = {
  email: string;
  password: string;
  username: string;
  emailValid: boolean;
  token: string | null;
  showLogin: boolean;
  toggle(): void;
  checkEmail(e: React.ChangeEvent<HTMLInputElement>): void;
  setPassword(e: React.ChangeEvent<HTMLInputElement>): void;
  newToken(newToken: string): void;
  logout(): void;
};
type LoginState = {
  localToken: string;
  redirect: boolean;
};

class Login extends Component<PassedProps, LoginState> {
  constructor(props: PassedProps) {
    super(props);
    this.state = {
      localToken: "",
      redirect: false,
    };
  }
  confirmAndSend = () => {
    this.userLogin();
  };

  userLogin = async () => {
    let userData = {
      email: this.props.email,
      password: this.props.password,
    };

    try {
      let response = await fetch(`${APIURL}/user/login`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(userData),
      });
      let data = await response.json();

      let dataToken = data.sessionToken;
      this.props.newToken(dataToken);
      this.setState({
        localToken: dataToken,
        redirect: !this.state.redirect,
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { checkEmail, setPassword, toggle } = this.props;
    return (
      <>
        {this.state.redirect === true ? (
          <Redirect to='/profile' />
        ) : (
          <>
            <Form>
              <p></p>
              <Input type='email' onChange={(e) => checkEmail(e)} />
              <p></p>
              <Input
                type='password'
                onChange={(e) => setPassword(e)}
              />
              <Button type='submit' onClick={() => this.confirmAndSend()} >Login</Button>
              <Button type='submit' onClick={() => toggle()} >Click to Register</Button>
            </Form>
          </>
        )}
      </>
    );
  }
}

export default Login;
