import React, { Component } from "react";
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
  articles: {
    title: string;
    author: string;
    description: string;
    content: string;
    source: { name: string };
    publishedAt: string;
  }[];
  token: string | null;
};

type ModalState = {
  modal: boolean;
  modal2: boolean;
  entryName: string;
  description: string;
  article: {
    title: string;
    author: string;
    description: string;
    content: string;
    source: { name: string };
    publishedAt: string;
  };
  entryId: number;
  data: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: number;
    id: number;
    updatedAt: string;
  };
  id: number
};

class ModalLink extends Component<PassedProps, ModalState> {
  constructor(props: PassedProps) {
    super(props);
    this.state = {
      modal: false,
      modal2: false,
      entryName: "",
      description: "",
      article: {
        title: "",
        author: "",
        description: "",
        content: "",
        source: { name: "" },
        publishedAt: "",
      },
      entryId: 0,
      data: {
        UserId: 0,
        createdAt: "",
        description: "",
        entryName: 0,
        id: 0,
        updatedAt: "",
      },
      id:0,
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  createNewEntry = async () => {
    
    
    this.setState({
      modal2: !this.state.modal2,
    });
    let token = this.props.token ? this.props.token : localStorage.getItem("token")
    let entryData = {
      entryName: this.state.entryName,
      description: this.state.description,
    };

    try {
      let res = await fetch(`${APIURL}/entry/create`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
        body: JSON.stringify(entryData),
      });
      let data = await res.json();
      this.setState({
        data: data,
        id: data.data.id
      });
      console.log(data.data.id);
      console.log(this.state.id);
      
    } catch (err) {
      console.error(err);
    }
  };

  confirmEntry = () => {
    
    this.props.articles.map(async(article) =>  {
      
      let token = this.props.token ? this.props.token : localStorage.getItem("token")
      let articleData = {
        title: article.title,
        author: article.author,
        description: article.description,
        content: article.content,
        sourceName: article.source.name,
        publishedAt: article.publishedAt,
      }
        try {
          let res = await fetch(
            `${APIURL}/article/create/${this.state.id}`,
            {
              method: "POST",
              headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }),
              body: JSON.stringify(articleData),
            }
          );
          let data = await res.json();
    
          console.log(data);
        } catch (err) {
          console.error(err);
        }
    
      })
  
    console.log(this.state.article.source.name);
    
   
    this.setState({
      modal: !this.state.modal,
      modal2: !this.state.modal2,
    });
  };

  updateEntryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      entryName: e.target.value,
    });
  };

  updateDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      description: e.target.value,
    });
  };
  render() {
    const {} = this.props;
    const { modal, modal2, entryName, description } = this.state;
    return (
      <div>
        <Button onClick={this.toggle}>Save to New Entry</Button>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader color='danger'>Title</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Input
                type='text'
                value={entryName}
                onChange={this.updateEntryName}
              />
              <Input
                type='text'
                value={description}
                onChange={this.updateDescription}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='success' onClick={this.createNewEntry}>
              OK{" "}
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modal2} toggle={this.toggle}>
          <ModalHeader color='danger'>Title</ModalHeader>
          <ModalBody>
            second
          </ModalBody>
          <ModalFooter>
            <Button color='success' onClick={this.confirmEntry}>
              OK{" "}
            </Button>
          </ModalFooter>
        </Modal>
        {/* Second modal triggered by closing of first */}
      </div>
    );
  }
}

export default ModalLink;
