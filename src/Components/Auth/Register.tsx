import React, { Component } from "react";
import APIURL from "../../Utils/Environment";
import { Button, Input, Form, Container } from "reactstrap";
import "../../App.css";

type PassedProps = {
  username: string;
  email: string;
  password: string;
  emailValid: boolean;
  showLogin: boolean;
  toggle(): void;
  checkEmail(e: React.ChangeEvent<HTMLInputElement>): void;
  setPassword(e: React.ChangeEvent<HTMLInputElement>): void;
  setUserName(e: React.ChangeEvent<HTMLInputElement>): void;
};

type RegisterState = {
  confirmPassword: string;
};

class Register extends Component<PassedProps, RegisterState> {
  constructor(props: PassedProps) {
    super(props);
    this.state = {
      confirmPassword: "",
    };
  }
  confirmAndSend = () => {
    let message;
    if (
      this.props.password === this.state.confirmPassword &&
      this.state.confirmPassword.length > 5 &&
      this.props.emailValid === true
    ) {
      this.userRegister();
    } else if (this.props.emailValid !== true) {
      message = { message: "Email not valid, please enter a valid email." };
      console.log(message);
    } else if (this.props.password.length < 6) {
      message = { message: "Password must be at least 6 characters." };
      console.log(message);
    } else {
      message = { message: "Passwords must match" };
      console.log(message);
    }
  };

  userRegister = async () => {
    console.log("userRegister function called");

    let newUserData = {
      userName: this.props.username,
      email: this.props.email,
      password: this.props.password,
    };
    console.log(
      `newUserData --> ${newUserData.userName} ${newUserData.email} ${newUserData.password}`
    );

    try {
      let response = await fetch(`${APIURL}/user/register`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newUserData),
      });
      let data = await response.json();
      this.props.toggle();
      console.log(data);

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  confirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      confirmPassword: e.target.value,
    });
  };

  render() {
    const { checkEmail, setPassword, setUserName, toggle } = this.props;
    return (
      <>
        <Form className='login mt-5 pb-4 pt-2 px-4'>
          <h3 className='d-flex justify-content-center mb-5'>Register</h3>
          <p className='mb-1 ms-1'>email</p>
          <Input
            className='ps-4 ms-1'
            id='email'
            type='email'
            onChange={(e) => checkEmail(e)}
          />
          <p className='mb-1 mt-1 ms-1'>username</p>
          <Input className='ps-4 ms-1' id='username' type='text' onChange={(e) => setUserName(e)} />
          <p className='mt-1 mb-1 ms-1'>password</p>
          <Input className='ps-4 ms-1' id='password' type='text' onChange={(e) => setPassword(e)} />
          <p className='mt-1 ms-1'>password</p>
          <Input className='ps-4 ms-1' type='password' onChange={(e) => this.confirmPassword(e)} />
          <Container className='mt-4 me-5 ms-1'>
            <div className='d-flex justify-content-start'>
              <Button className=' mt-2 mb-2 me-2' type='submit' onClick={() => this.confirmAndSend()}>
                Register
              </Button >
              </div>
              <Button
                className='existingUser'
                type='submit'
                onClick={() => toggle()}
              >
                {" "}
                Already Have a Login{" "}
              </Button>
            
          </Container>
        </Form>
      </>
    );
  }
}

export default Register;
