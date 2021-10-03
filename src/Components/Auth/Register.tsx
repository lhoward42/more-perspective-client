import React, { Component } from "react";
import APIURL from "../../Utils/Environment";
import { Button } from "reactstrap";
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
        <fieldset>
          <input id='email' type='email' onChange={(e) => checkEmail(e)} />
          <input id='username' type='text' onChange={(e) => setUserName(e)} />
          <input id='password' type='text' onChange={(e) => setPassword(e)} />
          <input type='text' onChange={(e) => this.confirmPassword(e)} />
          <input type='submit' onClick={() => this.confirmAndSend()} />
          <Button
            className='existingUser'
            type='submit'
            onClick={() => toggle()}
          >
            {" "}
            Already Have a Login{" "}
          </Button>
        </fieldset>
      </>
    );
  }
}

export default Register;
