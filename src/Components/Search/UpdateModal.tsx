import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Container,
  FormGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Redirect } from "react-router-dom";

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
    url: string;
  }[];
  token: string | null;
};

type ModalState = {
  modal: boolean;
  article: {
    title: string;
    author: string;
    description: string;
    content: string;
    source: { name: string };
    publishedAt: string;
    urlToImage: string;
    url: string;
  };
  existingEntries: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: string;
    id: number;
    updatedAt: string;
  }[];
  entryId: number;
  data: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: number;
    id: number;
    updatedAt: string;
  };
  id: number;
  entry: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: string;
    id: number;
    updatedAt: string;
  };
  selectedEntry: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: string;
    id: number;
    updatedAt: string;
  };

  dropDownOpen: boolean;
  entrySelection: number;
  redirect: boolean;
};

class UpdateModal extends Component<PassedProps, ModalState> {
  constructor(props: PassedProps) {
    super(props);
    this.state = {
      modal: false,
      existingEntries: [],
      article: {
        title: "",
        author: "",
        description: "",
        content: "",
        source: { name: "" },
        publishedAt: "",
        urlToImage: "",
        url: "",
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
      id: 0,
      entry: {
        UserId: 1,
        createdAt: "",
        description: "",
        entryName: "",
        id: 0,
        updatedAt: "",
      },
      selectedEntry: {
        UserId: 0,
        createdAt: "",
        description: "",
        entryName: "",
        id: 0,
        updatedAt: "",
      },

      dropDownOpen: false,
      entrySelection: 0,
      redirect: false,
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
      this.setState({ existingEntries: data, modal: !this.state.modal });
      console.log(this.state.existingEntries);
    } catch (err) {
      console.error(err);
    }
  };
  setDropDownOpen = () => {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen,
    });
  };

  getEntryToAddArticles = async (entry: {
    UserId: number;
    createdAt: string;
    description: string;
    entryName: string;
    id: number;
    updatedAt: string;
  }) => {
    this.setState({
      entrySelection: entry.id,
      entry: entry,
    });
    let token = this.props.token
      ? this.props.token
      : localStorage.getItem("token");

    try {
      let res = await fetch(`${APIURL}/entry/${entry.id}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      });
      let data = res.json();
      console.log(data);
    } catch (err) {
      console.error(err, "error happen here");
    }
  };

  updateArticlestoEntry = () => {
    this.props.articles.map(async (article) => {
      let articleData = {
        title: article.title,
        author: article.author,
        description: article.description,
        content: article.content,
        sourceName: article.source.name,
        publishedAt: article.publishedAt,
        image: article.urlToImage,
        url: article.url,
      };
      let token = this.props.token
        ? this.props.token
        : localStorage.getItem("token");

      try {
        let res = await fetch(
          `${APIURL}/article/create/${this.state.entrySelection}`,
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
    });

    console.log(this.state.article.source.name);

    this.setState({
      modal: !this.state.modal,
      redirect: !this.state.redirect,
    });
  };
  cancel = () => {
    this.setState({
      modal: !this.state.modal,
      selectedEntry: {
        UserId: 0,
        createdAt: "",
        description: "",
        entryName: "",
        id: 0,
        updatedAt: "",
      },
    });
  };

  componentWillUnmount() {
    this.setState({
      existingEntries: [],
    });
  }

  render() {
    const { modal, dropDownOpen, existingEntries, entry } = this.state;
    return (
      <>
        {this.state.redirect === true ? (
          <Redirect
            to={{
              pathname: "/profile/editEntry",
              state: {
                entry: this.state.entry,
                token: this.props.token,
              },
            }}
            push
          />
        ) : (
          <Container>
            <p className='d-flex justify-content-center'>
              <Button onClick={this.getEntries}>
                Update Existing Entry with Selected Articles
              </Button>
            </p>
            <Modal isOpen={modal} toggle={this.toggle}>
              <ModalHeader color='danger'>Title</ModalHeader>
              <ModalBody>
                <FormGroup >
                  <Dropdown className='d-flex flex-column' isOpen={dropDownOpen} toggle={this.setDropDownOpen}>
                    <DropdownToggle caret>Choose an Entry</DropdownToggle>
                    <DropdownMenu>
                      {existingEntries.map((entry) => (
                        <DropdownItem
                          key={entry.id}
                          value={entry.entryName}
                          onClick={() => this.getEntryToAddArticles(entry)}
                        >
                          {entry.entryName}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                    <h5 className="d-flex justify-content-center">{entry.entryName}</h5> <br />
                    <p className="d-flex justify-content-center">{entry.description}</p>
                  </Dropdown>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button onClick={this.cancel}>Cancel</Button>
                <Button color='success' onClick={this.updateArticlestoEntry}>
                  Save Articles to Entry{" "}
                </Button>
              </ModalFooter>
            </Modal>
          </Container>
        )}
      </>
    );
  }
}

export default UpdateModal;
