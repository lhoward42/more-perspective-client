import { Component } from "react";

type PassedProps = {
  // history: any
};

class Profile extends Component<PassedProps, {}> {
  render() {
    return (
      <>
        {/* {JSON.stringify(this.props.history.location.state)} */}
        Display <br />
        The Profile point route!!
      </>
    );
  }
}

export default Profile;
