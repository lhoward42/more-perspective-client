import { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Input,
} from "reactstrap";
import { Redirect } from "react-router-dom";
import APIURL from "../../Utils/Environment";
import EditEntry from "./EditEntry";

type PassedProps = {
  // history: any
  token: string | null;
};
type ProfileStates = {
  existingEntries: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: string;
    id: number;
    updatedAt: string;
  }[];
  entry: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: string;
    id: number;
    updatedAt: string;
  };
  shouldRedirect: boolean;
};
class Profile extends Component<PassedProps, ProfileStates> {
  constructor(props: PassedProps) {
    super(props);
    this.state = {
      existingEntries: [],
      shouldRedirect: false,
      entry: {
        UserId: 0,
        createdAt: "",
        description: "",
        entryName: "",
        id: 0,
        updatedAt: "",
      },
    };
  }

  getEntries = async () => {
    let token = this.props.token
      ? this.props.token
      : localStorage.getItem("token");
    try {
      let res = await fetch(`${APIURL}/entry/mine`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      });
      let data = await res.json();
      console.log(data);
      await this.setState({ existingEntries: data });
    } catch (err) {
      console.error(err);
    }
  };

  selectEntry = (entry: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: string;
    id: number;
    updatedAt: string;
  }) => {
    this.setState({
      entry: entry,
    });
  };
  onSubmit = () => {
    this.setState({ shouldRedirect: !this.state.shouldRedirect });
  };
  componentDidMount() {
    this.getEntries();
  }

  render() {
    const { existingEntries } = this.state;
    return (
      <>
        {this.state.shouldRedirect === true ? (
          <Redirect
            to={{
              pathname: "/profile/entry",
              state: { entry: this.state.entry },
            }}
            push
          />
        ) : (
          <>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Entry Name</th>
                  <th>Description</th>
                  <th>
                    Select
                    <br />
                    Entry
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {existingEntries.map((entry) => (
                  <tr key={entry.id} data-item={entry}>
                    <td>{entry.entryName}</td>
                    <td>{entry.description}</td>
                    <td>
                      <Button onClick={() => this.selectEntry(entry)}></Button>
                    </td>
                    <td>
                     
                    </td>
                  </tr>
                ))} 
                <EditEntry
                        token={this.props.token}
                        entry={this.state.entry}
                      />
              </tbody>
            </table>
          </>
        )}
      </>
    );
  }
}

export default Profile;
