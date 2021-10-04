import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  Button,
  Input,
  Card,
  CardImg,
  Container
} from "reactstrap";

import APIURL from "../../Utils/Environment";

type PassedProps = {
  token: string | null;
  location: {
    state: {
      entry: {
        UserId: number;
        createdAt: string;
        description: string;
        entryName: string;
        id: number;
        updatedAt: string;
      };
    };
  };
  history: { goBack(): void };
};

type EditEntryState = {
  modal: boolean;
  entryName: string;
  entryId: number;
  description: string;
  showInput: boolean;
  articles: {
    EntryId: number;
    id: number;
    title: string;
    author: string;
    description: string;
    content: string;
    sourceName: string;
    publishedAt: string;
    image: string;
    url: string;
  }[];
};

class EditEntry extends Component<PassedProps, EditEntryState> {
  constructor(props: PassedProps) {
    super(props);
    this.state = {
      modal: false,
      entryName: this.props.location.state.entry.entryName,
      description: this.props.location.state.entry.description,
      entryId: this.props.location.state.entry.id,
      showInput: false,
      articles: [],
    };
  }
  getArticles = async () => {
    let token = this.props.token
      ? this.props.token
      : localStorage.getItem("token");
    try {
      let res = await fetch(`${APIURL}/article/${this.state.entryId}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      });
      let data = await res.json();
      console.log(data);
      await this.setState({
        articles: data,
      });
      console.log(this.state.articles);
    } catch (err) {
      console.error(err);
    }
  };
  componentDidMount() {
    this.getArticles();
    console.log(this.props.location.state);

    console.log(this.props.location.state.entry.id);
  }

  showUpdateInput = () => {
    this.setState({
      showInput: !this.state.showInput,
    });
  };

  updateEntry = async () => {
    let token = this.props.token
      ? this.props.token
      : localStorage.getItem("token");
    try {
      let res = await fetch(
        `${APIURL}/entry/update/${this.props.location.state.entry.id}`,
        {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }),
          body: JSON.stringify({
            entryName: this.state.entryName,
            description: this.state.description,
          }),
        }
      );
      let data = await res.json();
      console.log(data);
      this.setState({
        showInput: !this.state.showInput,
      });
    } catch (err) {
      console.error(err);
    }
  };
  deleteArticle = async (article: {
    EntryId: number;
    id: number;
    title: string;
    author: string;
    description: string;
    content: string;
    sourceName: string;
    publishedAt: string;
    image: string;
    url: string;
  }) => {
    let token = this.props.token
      ? this.props.token
      : localStorage.getItem("token");
    try {
      let res = await fetch(
        `${APIURL}/article/delete/${article.EntryId}/${article.id}`,
        {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }),
        }
      );
      let data = res.json();
      console.log(data, "Successfully deleted");
      let array = await [...this.state.articles];
      let index = array.indexOf(article);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ articles: array });
      }
    } catch (err) {
      console.error(err);
    }
  };

  cancelEntryUpdate = () => {
    this.setState({
      showInput: false,
      entryName: "",
      description: "",
    });
  };

  //  showArticles = () => {
  // if (this.state.articles)

  //  }

  setName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      this.setState({
        entryName: e.target.value,
      });
    } else {
      this.setState({
        entryName: this.props.location.state.entry.entryName,
      });
    }
  };

  setDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      this.setState({
        description: e.target.value,
      });
    } else {
      this.setState({
        description: this.props.location.state.entry.description,
      });
    }
  };

  render() {
    const { modal } = this.state;
    return (
      <Container className="entryContainer">
        <>
          {this.state.showInput === false ? (
            <>
              {this.props.location.state.entry.entryName}
              <br />
            </>
          ) : (
            <>
              {" "}
              {this.props.location.state.entry.entryName}
              <Input
                type='text'
                defaultValue={this.props.location.state.entry.entryName}
                placeholder='Edit Entry Name'
                onChange={(e) => this.setName(e)}
              />
            </>
          )}
          {this.state.showInput === false ? (
            <>
              {this.props.location.state.entry.description} <br />
              <Button onClick={this.showUpdateInput}>Edit Entry</Button>{" "}
            </>
          ) : (
            <>
              {this.props.location.state.entry.description}{" "}
              <Input
                type='text'
                placeholder='Edit Description'
                onChange={(e) => this.setDescription(e)}
              />{" "}
              <Button color='primary' onClick={this.updateEntry}>
                Save Changes
              </Button>
              <Button color='primary' onClick={this.cancelEntryUpdate}>
                Cancel
              </Button>
            </>
          )}
        </>
        <br />
        Articles In Entry
        <br />
        <Container className='row gx-3 d-flex justify-content-center'>
          {this.state.articles.map((article) => (
            <div className="col-3 ">
            <Card>
              {article.title}
              <a href={article.url}>Link to Article</a>
              <CardImg className='newsPics' src={article.image} />
              <br />{" "}
              <Button onClick={() => this.deleteArticle(article)}>
                Delete
              </Button>
            </Card>
            </div>
          ))}
        </Container>
        <i
          className='fas fa-arrow-circle-left fa-2xl'
          onClick={this.props.history.goBack}
        >
          <u>View All Entries</u>
        </i>
      </Container>
    );
  }
}

export default EditEntry;
