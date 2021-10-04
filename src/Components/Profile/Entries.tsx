import { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Input,
} from "reactstrap";

import APIURL from "../../Utils/Environment";
import DeleteModal from "./DeleteModal";
// import EditEntry from "./EditEntry";

type PassedProps = {
  token: string | null;
  open: boolean;
  setOpen(): void;
  closeNav(): void;
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
  modal: boolean;
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
      modal: false,
    };
  }
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
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
      shouldRedirect: !this.state.shouldRedirect,
    });
  };
  selectEntryToDelete = (entry: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: string;
    id: number;
    updatedAt: string;
  }) => {
    this.setState({
      entry: entry,
      modal: !this.state.modal,
    });
  };
  deleteEntry = async (entry: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: string;
    id: number;
    updatedAt: string;
  }) => {
    let token = this.props.token
      ? this.props.token
      : localStorage.getItem("token");
    try {
      let res = await fetch(`${APIURL}/entry/delete/${entry.id}/`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      });
      let data = res.json();
      console.log(data, "Successfully deleted");
      this.setState({
        modal: !this.state.modal,
      });
      let array = await [...this.state.existingEntries];
      let index = array.indexOf(entry);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ existingEntries: array });
      }
    } catch (err) {
      console.error(err);
    }
  };
  deleteModalToggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  componentDidMount() {
    this.getEntries();
    this.props.closeNav();
  }

  render() {
    const { existingEntries, modal, shouldRedirect, entry } = this.state;
    return (
      <Container>
        {shouldRedirect === true ? (
          <Redirect
            to={{
              pathname: "/profile/editEntry",
              state: {
                entry: entry,
                token: this.props.token,
              },
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
                    Edit
                    <br />
                    Entry
                  </th>
                  <th>Delete
                    <br />
                    Entry</th>
                </tr>
              </thead>
              <tbody>
                {existingEntries.map((entry) => (
                  <tr key={entry.id} data-item={entry}>
                    <td>{entry.entryName}</td>
                    <td>{entry.description}</td>
                    <td>
                      <Button onClick={() => this.selectEntry(entry)}>
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button onClick={() => this.selectEntryToDelete(entry)}>
                        Delete
                      </Button>
                      <DeleteModal
                        toggle={this.deleteModalToggle}
                        modal={this.state.modal}
                        entry={this.state.entry}
                        deleteEntry={this.deleteEntry}
                      />
                      {/* <>
                      <Button
                        onClick={() => this.selectEntryToDelete(entry)}>
                          Delete
                        </Button>
                      <Modal isOpen={modal} toggle={this.toggle}>
                       <ModalHeader>
                         <ModalBody>
                           inside
                           <Button
                        onClick={() => this.selectEntryToDelete(entry)}>
                          Delete
                        </Button>
                        <Button
                        onClick={() => this.selectEntryToDelete(entry)}>
                          Cancel
                        </Button>
                         </ModalBody>
                       </ModalHeader>
                      </Modal>
                      </> */}
                    </td>
                  </tr>
                ))}
                {/* <EditEntry token={this.props.token} entry={this.state.entry} /> */}
              </tbody>
            </table>
          </>
        )}
      </Container>
    );
  }
}

export default Profile;
