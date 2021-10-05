import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
    urlToImage: string;
    url: string
  }[];
  token: string | null;
};

type ModalState = {
  confirmArticles: {
    title: string;
    author: string;
    description: string;
    content: string;
    source: { name: string };
    publishedAt: string;
    urlToImage: string;
  }[];
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
    urlToImage: string;
  };
  entryId: number;
  data: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: number;
    id: number;
    updatedAt: string;
    urlToImage: string;
  };
  id: number;
  redirect: boolean;
  checked: boolean;
};

class ModalLink extends Component<PassedProps, ModalState> {
  constructor(props: PassedProps) {
    super(props);
    this.state = {
      confirmArticles: [],
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
        urlToImage: "",
      },
      entryId: 0,
      data: {
        UserId: 0,
        createdAt: "",
        description: "",
        entryName: 0,
        id: 0,
        updatedAt: "",
        urlToImage: "",
      },
      id: 0,
      redirect: false,
      checked: true,
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  cancel = () => {
    this.setState({
      modal: false,
      modal2: false,
      confirmArticles: [],
    });
  };
  cancel2 = () => {
    this.setState({
      modal2: false,
    });
  };
  createNewEntry = async () => {
    this.setState({
      modal2: !this.state.modal2,
    });
    let token = this.props.token
      ? this.props.token
      : localStorage.getItem("token");
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
        id: data.data.id,
      });
      console.log(data.data.id);
      console.log(this.state.id);
    } catch (err) {
      console.error(err);
    }
  };

  confirmEntry = () => {
    this.props.articles.map(async (article) => {
      let token = this.props.token
        ? this.props.token
        : localStorage.getItem("token");

      let articleData = {
        title: article.title,
        author: article.author,
        description: article.description,
        content: article.content,
        sourceName: article.source.name,
        publishedAt: article.publishedAt,
        image: article.urlToImage,
      };
      try {
        let res = await fetch(`${APIURL}/article/create/${this.state.id}`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }),
          body: JSON.stringify(articleData),
        });
        let data = await res.json();
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    });

    console.log(this.state.article.source.name);

    this.setState({
      modal: !this.state.modal,
      modal2: !this.state.modal2,
      redirect: !this.state.redirect,
    });
  };

  confirmAll = async () => {
    await this.createNewEntry();
    await this.confirmEntry();
  };
  c;
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

  check = async (
    article: {
      title: string;
      author: string;
      description: string;
      content: string;
      source: { name: string };
      publishedAt: string;
      urlToImage: string;
    },
    e: { target: { checked: boolean } }
  ) => {
    await this.setState({
      checked: e.target.checked,
    });
    if (e.target.checked === true) {
      this.setState({
        confirmArticles: [...this.state.confirmArticles, article],
      });
    } else if (e.target.checked === false) {
      let array = [...this.state.confirmArticles];
      let index = array.indexOf(article);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ confirmArticles: array });
      }
    }
  };

  render() {

    const { modal, entryName, description } = this.state;
    return (
      <>
        {this.state.redirect === false ? (
          <div >
            <p className="d-flex justify-content-center mt-5"><Button onClick={this.toggle}>Save Selected Articles New Entry</Button></p>
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
                <Button color='success' onClick={this.confirmAll}>
                  Save Entry{" "}
                </Button>
                <Button onClick={this.cancel}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        ) : (
          <Redirect to='/profile' push />
        )}
      </>
    );
  }
}

export default ModalLink;
