import { Component } from "react";
import { Button } from 'reactstrap'
import { Redirect } from "react-router-dom";

type PassedProps = {
  colorMode: boolean;
  token: string | null;
  open: boolean;
  setOpen(): void;
  closeNav(): void;
};
type HomeState = {
    redirect: boolean
};
class Home extends Component<PassedProps, HomeState> {
  constructor(props: PassedProps) {
    super(props);
    this.state = {
        redirect: false
    };
  }
shouldRedirect = () => {
    this.setState({
        redirect: !this.state.redirect
    })
}
componentDidMount(){
    this.props.closeNav()
}
  render() {
    return (
        <div className="mt-4">
      {this.state.redirect === false ? <div className="homepage d-flex justify-content-center align-items-center flex-column">
        <h1 className='title d-flex justify-content-center'>More Perspective</h1>
        <h4> Get the full scope of what's happening in your world</h4>
        <Button onClick={() => this.shouldRedirect()} >Get Started!</Button>
      </div> : (
          <Redirect
            to={{
              pathname: "/news",
            }}
            push
          />
        )}
      </div>
    );
  }
}

export default Home;
