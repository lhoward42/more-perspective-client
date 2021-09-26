import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ModalLink from "./Modal";
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
    publishedAt: string;
    source: { name: string; id: string };
    title: string;
    content: string;
  }[];
  art: {
    publishedAt: string;
    source: { name: string; id: string };
    title: string;
    content: string;
  }[];
 
  searchTerm: {
    publishedAt: string;
    source: { name: string; id: string };
    title: string;
    content: string;
  }[];
  displaySearchState: {
    publishedAt: string;
    source: { name: string; id: string };
    title: string;
    content: string;
  }[];
  shouldRedirect: boolean;
  modal: boolean; 
  entryName: string
  titles: Array<string>;
  title: string;
  author: string;
  
  
};

class SearchNews extends Component<PassedProps, SearchState> {
  constructor(props: PassedProps) {
    super(props);
    this.state = {
      dataResponse: [],
      articles: [],
      art: [],
      
      searchTerm: [],
      displaySearchState: [],
      shouldRedirect: false,
      modal: false,
      titles: [],
      title: "",
      author: "",
      entryName: "", 
      
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async fetchNews() {
    const API_KEY = `42f599c7ca48424caa76369e2aa73550`;
    try {
      let res = await fetch(
        `https://newsapi.org/v2/everything?domains=cnn.com,foxnews.com,washingtonpost.com,nypost.com,theepochtimes.com,vox.com&apiKey=${API_KEY}`,
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
      console.log(err);
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
  setEntryName = (e:React.ChangeEvent<HTMLInputElement> ) => {
    this.setState({
      entryName: e.target.value
    })
  }
handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  this.setState({

  });
}

  displayFunction = () => {
    if (this.state.displaySearchState.length > 0) {
      return this.state.displaySearchState.map((article) => (
        <div>
          <>
            {" "}
            {article.publishedAt}
            {article.source.name} <br /> {article.title} <br />{" "}
            {article.content}
            {/* <ModalLink articles={this.state.articles}/> */}
          </>
        </div>
      ));
    } else if (this.state.articles && this.props.colorMode === false) {
      {
        return this.state.articles.map((article, index) => (
          <div>
            {article.source.name === "CNN" ||
            article.source.name === "VOX" ||
            article.source.name === "The Washington Post" ? (
              <>
                {" "}
                {article.publishedAt}
                {article.source.name} <br /> {article.title} <br />{" "}
                {article.content}{" "}
              </>
            ) : undefined}

          </div>
        ));
      }
    } else if (this.state.articles && this.props.colorMode === true) {
      return this.state.articles.map((article) => (
        <div >
          {article.source.name === "New York Post" ||
          article.source.name === "Fox News" ||
          article.source.name === "The Epoch Times" ? (
            <>
              {" "}
              {article.publishedAt}
              <br />
              {article.source.name} <br /> {article.title} <br />{" "}
              {article.content}{" "}
              {/* <Button onClick={this.toggle}>Open Modal</Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader color='danger'>Title</ModalHeader>
                <ModalBody value={this.state.art}>
                  <Input type="text" onChange={(e) => this.setEntryName(e)} />
                <Input type="select" options={article} />
                  {article.title}
                  {article.source.name}
                  {article.content}
                  </ModalBody>
                <ModalFooter>
                <select
            name="numberOfGuests"
            type="checkbox"
            value={}
            onChange={this.handleInputChange} ></select>
                  <Button color='success' onSubmit={this.toggle}>
                    OK{" "}
                  </Button>
                </ModalFooter>
              </Modal> */}
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

  componentWillUnmount() {}

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
