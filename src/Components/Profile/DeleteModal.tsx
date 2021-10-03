import { Component } from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

type PassedProps = {
  entry: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: string;
    id: number;
    updatedAt: string;
  };
  deleteEntry(entry: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: string;
    id: number;
    updatedAt: string;
  }): void;
  modal: boolean;
  toggle(): void;
};

type DeleteModalState = {
  id: number;
};

class DeleteModal extends Component<PassedProps, DeleteModalState> {
  constructor(props: PassedProps) {
    super(props);
    this.state = {
      id: this.props.entry.id,
    };
  }

  render() {
    return (
      <>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
          <ModalHeader>
            <ModalBody>
              inside
              <Button
                onClick={() => {
                  this.props.deleteEntry(this.props.entry);
                }}
              >
                Delete
              </Button>
              <Button onClick={this.props.toggle}>Cancel</Button>
            </ModalBody>
          </ModalHeader>
        </Modal>
      </>
    );
  }
}

export default DeleteModal;
