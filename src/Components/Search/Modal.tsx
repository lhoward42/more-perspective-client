import { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

type PassedProps = {
  articles: {
    publishedAt: string;
    source: { name: string; id: string };
    title: string;
    content: string;
  }[];
};

type ModalState = {
  modal: boolean;
  articleTitle: string;
};

class ModalLink extends Component<PassedProps, ModalState> {
  constructor(props: PassedProps) {
    super(props);
    this.state = {
      modal: false,
      articleTitle: "",
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };


  

  render() {
    const { articles } = this.props;
    const { modal } = this.state;
    return (
      <div>
        <Button onClick={this.toggle}>Open Modal</Button>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader color='danger'>Title</ModalHeader>
          <ModalBody>Just one thing</ModalBody>
          <ModalFooter>
            <Button color='success' onClick={this.toggle}>
              OK{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalLink;
