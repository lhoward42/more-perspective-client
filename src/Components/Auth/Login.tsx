import React, { Component } from "react";
import APIURL from "../../Utils/Environment";
import { Redirect } from "react-router-dom";
import {  Input, Button, Container } from "reactstrap";
import "../../App.css";

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
          <Container className='mt-5 pb-4 pt-2 px-4 login'>
            <div>
              <h3 className="d-flex justify-content-center mb-5 ">Login</h3>
              <p className="mb-1">email</p>
              <Input type='email' onChange={(e) => checkEmail(e)} />
              <p className="mt-2 mb-1">password</p>
              <Input type='password' onChange={(e) => setPassword(e)} />
              <div className='d-flex justify-content-start'>
                <Button
                  className='ms-2 mt-4 mb-2'
                  type='submit'
                  onClick={() => this.confirmAndSend()}
                >
                  Login
                </Button>
              </div>
              <Button className='me-2 ms-2' onClick={() => toggle()}>
                Click to Register
              </Button>
            </div>
          </Container>
        )}
      </>
    );
  }
}

export default Login;
