import { Component } from "react";
import Register from "./Register";
import Login from "./Login";

type PortalProps = {
  token: string | null;
  newToken(newToken: string): void;
  logout(): void;
  open: boolean;
  setOpen(): void;
  closeNav(): void;
};
type PortalState = {
  email: string;
  password: string;
  username: string;
  showLogin: boolean;
  emailValid: boolean;
};

class Portal extends Component<PortalProps, PortalState> {
  constructor(props: PortalProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      showLogin: true,
      emailValid: false,
    };
  }

  toggleLoginSignup = () => {
    this.setState({
      showLogin: !this.state.showLogin,
    });
  };

  checkEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: e.target.value,
    });

    if (e.target.value.includes("@") && e.target.value.includes(".")) {
      this.setState({
        emailValid: true,
      });
    }
  };

  setPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: e.target.value,
    });
  };

  setUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      username: e.target.value,
    });
  };
  componentDidMount() {
    this.props.setOpen();
    this.props.closeNav();
  }

  render() {
    const { email, password, username, emailValid, showLogin } = this.state;
    const { token, newToken, logout } = this.props;
    return (
      <>
        {showLogin ? (
          <Login
            email={email}
            password={password}
            username={username}
            emailValid={emailValid}
            showLogin={showLogin}
            toggle={this.toggleLoginSignup}
            checkEmail={this.checkEmail}
            setPassword={this.setPassword}
            token={token}
            newToken={newToken}
            logout={logout}
          />
        ) : (
          <Register
            email={email}
            password={password}
            username={username}
            emailValid={emailValid}
            checkEmail={this.checkEmail}
            showLogin={showLogin}
            toggle={this.toggleLoginSignup}
            setPassword={this.setPassword}
            setUserName={this.setUserName}
          />
        )}
      </>
    );
  }
}

export default Portal;
