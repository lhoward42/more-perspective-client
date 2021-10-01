import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import APIURL from "../../Utils/Environment";
import ModalLink from "./Modal";
import UpdateModal from "./UpdateModal";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

type PassedProps = {
  colorMode: boolean;
  token: string | null;
};
type SearchState = {
  dataResponse: (string | number)[];
  articles: {
    title: string;
    author: string;
    description: string;
    content: string;
    source: { name: string };
    publishedAt: string;
  }[];
  checkedArticles: {
    title: string;
    author: string;
    description: string;
    content: string;
    source: { name: string };
    publishedAt: string;
  }[];
  filteredArticles: {
    title: string;
    author: string;
    description: string;
    content: string;
    source: { name: string };
    publishedAt: string;
  }[];
  searchTerm: {
    title: string;
    author: string;
    description: string;
    content: string;
    source: { name: string };
    publishedAt: string;
  }[];
  displaySearchState: {
    title: string;
    author: string;
    description: string;
    content: string;
    source: { name: string };
    publishedAt: string;
  }[];
  shouldRedirect: boolean;
  modal: boolean;
  entryName: string;
  description: string;
  check: string;
  checked: boolean;
  token: string
};

class SearchNews extends Component<PassedProps, SearchState> {
  constructor(props: PassedProps) {
    super(props);
    this.state = {
      dataResponse: [],
      articles: [],
      checkedArticles: [],
      filteredArticles: [],
      searchTerm: [],
      displaySearchState: [],
      shouldRedirect: false,
      modal: false,
      entryName: "",
      description: "",
      check: "",
      checked: false,
      token: ""
    };
  }

  async fetchNews() {
    const API_KEY = `42f599c7ca48424caa76369e2aa73550`;
    try {
      let res = await fetch(
        `https://newsapi.org/v2/everything?domains=cnn.com,foxnews.com,vox.com,nypost.com,theepochtimes.com,thewashingtonpost.com&apiKey=${API_KEY}`,
        {
          method: "GET",
        }
      );
      let data = await res.json();
      console.log(data.articles);
      this.setState({
        articles: data.articles,
      });
    } catch (err) {
      console.log(err, "error happened here");
    }
  }

  // Search Bar Functions
  setSearch = (value: string) => {
    const results = this.state.articles.filter((article) =>
      article.content.includes(value.toLowerCase())
    );
    this.setState({
      searchTerm: results,
    });
  };

  sendSearchResults = () => {
    this.setState({
      displaySearchState: this.state.searchTerm,
    });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  setEntryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      entryName: e.target.value,
    });
  };
  saveArticle = async (
    article: {
      title: string;
      author: string;
      description: string;
      content: string;
      source: { name: string };
      publishedAt: string;
    },
    checked: boolean
  ) => {
    await this.setState({
      checked: !this.state.checked,
    });
    if (checked === true) {
      this.setState({
        checkedArticles: [...this.state.checkedArticles, article],
      });
    } else if (checked === false) {
      let array = [...this.state.checkedArticles];
      let index = array.indexOf(article);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ checkedArticles: array });
      }
    }
  };

  displayFunction = () => {
    if (this.state.displaySearchState.length > 0) {
      return this.state.displaySearchState.map((article) => (
        <div>
          <>
            {" "}
            {article.publishedAt}
            {article.source.name} <br /> {article.title} <br />{" "}
            {article.content}
            <Input
              type='checkbox'
              onChange={(e) => {
                this.saveArticle(article, e.target.checked);
              }}
            />
          </>
        </div>
      ));
    } else if (this.state.articles && this.props.colorMode === false) {
      return this.state.articles.map((article) => (
        <div>
          {article.source.name === "CNN" ||
          article.source.name === "The Washington Post" ||
          article.source.name === "VOX" ? (
            <>
              {" "}
              {article.publishedAt}
              {article.source.name} <br /> {article.title} <br />{" "}
              {article.content}
              <Input
                value='new'
                type='checkbox'
                onChange={(e) => {
                  this.saveArticle(article, e.target.checked);
                }}
              />
              Add Article to Entry
            </>
          ) : undefined}
        </div>
      ));
    } else if (this.state.articles && this.props.colorMode === true) {
      return this.state.articles.map((article) => (
        <div>
          {article.source.name === "New York Post" ||
          article.source.name === "Fox News" ||
          article.source.name === "The Epoch Times" ? (
            <>
              {" "}
              {article.publishedAt}
              {article.source.name} <br /> {article.title} <br />{" "}
              {article.content}
              <Input
                value='new'
                type='checkbox'
                onChange={(e) => {
                  this.saveArticle(article, e.target.checked);
                }}
              />
              Add Article to Entry
            </>
          ) : undefined}
        </div>
      ));
    } else {
      console.log("error");
    }
  };

  onSubmit = () => {
    this.setState({ shouldRedirect: true });
  };

  //Lifecycle methods
  componentDidMount() {
    this.fetchNews();
  }
  componentDidUpdate() {}

  componentWillUnmount() {
    this.setState({
      checkedArticles: [],
    });
  }

  render() {
    return (
      <div className='App'>
        {this.state.shouldRedirect === true && this.props.token !== "" ? (
          <Redirect
            to={{
              pathname: "/profile",
              state: { articles: this.state.articles },
            }}
            push
          />
        ) : (
          <>
            <ModalLink
              articles={this.state.checkedArticles}
              token={this.props.token}
            />
            <UpdateModal
              articles={this.state.checkedArticles}
              token={this.props.token}
            />
            <fieldset>
              <input onChange={(e) => this.setSearch(e.target.value)} />
              <input
                type='submit'
                className={"start"}
                onClick={() => this.sendSearchResults()}
              />
            </fieldset>
            <button onClick={() => this.onSubmit()}>Redirect</button>
            {this.displayFunction()}{" "}
          </>
        )}
      </div>
    );
  }
}

export default SearchNews;
