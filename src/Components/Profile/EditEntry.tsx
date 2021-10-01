import { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormGroup,
} from "reactstrap";
import APIURL from "../../Utils/Environment";

type PassedProps = {
  token: string | null;
  entry: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: string;
    id: number;
    updatedAt: string;
  };
};

type EditEntryState = {
  modal: boolean;
  entryName: string;
  description: string;
  entryNameToSubmit: string;
  descriptionToSubmit: string;
};

class EditEntry extends Component<PassedProps, EditEntryState> {
  constructor(props: PassedProps) {
    super(props);
    this.state = {
      modal: false,
      entryName: "",
      description: "",
      entryNameToSubmit: "",
      descriptionToSubmit: "",
    };
  }
  setInitialState = () => {
    this.setState({
      entryName: this.props.entry.entryName,
      description: this.props.entry.description,
    });
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  componentDidMount() {
    this.setInitialState();
  }
  cancelUpdate = () => {
    this.setState({
      entryName: this.props.entry.entryName,
      description: this.props.entry.description,
      modal: !this.state.modal,
    });
  };

  editEntry = () => {
    if (this.state.entryName.length > 0) {
      this.setState({
        entryNameToSubmit: this.state.entryName,
      });
    } else {
      this.setState({
        entryNameToSubmit: this.props.entry.entryName,
      });
    }
  };
  setName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      this.setState({
        entryName: e.target.value,
      });
    }
  };

  render() {
    const { modal } = this.state;
    return (
      <div>
        <Button color='danger' onClick={this.toggle}>
          Edit Selected Entry
        </Button>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {this.props.entry.entryName}
          </ModalHeader>
          <ModalBody>
            <Input
              type='text'
              placeholder='Edit Entry Name'
              defaultValue={this.props.entry.entryName}
              onChange={(e) => this.setName(e)}
            />
            <Input
              type='text'
              placeholder='Edit Description'
              defaultValue={this.props.entry.description}
            />{" "}
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.editEntry}>
              Do Something
            </Button>{" "}
            <Button color='secondary' onClick={this.cancelUpdate}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditEntry;
