import React, { Component } from "react";
import ModalLink from "./Modal";
import UpdateModal from "./UpdateModal";
import {
  Input,
  Container,
  Card,
  CardImg,
  Form,
  Button,
  ListGroupItem,
} from "reactstrap";
import { Redirect } from "react-router-dom";
import NEWSDATA from "../../Utils/NewsEnvironment";
type PassedProps = {
  colorMode: boolean;
  token: string | null;
  open: boolean;
  setOpen(): void;
  closeNav(): void;
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
    urlToImage: string;
    url: string;
  }[];
  checkedArticles: {
    title: string;
    author: string;
    description: string;
    content: string;
    source: { name: string };
    publishedAt: string;
    urlToImage: string;
    url: string;
  }[];
  filteredArticles: {
    title: string;
    author: string;
    description: string;
    content: string;
    source: { name: string };
    publishedAt: string;
    urlToImage: string;
    url: string;
  }[];
  searchTerm: {
    title: string;
    author: string;
    description: string;
    content: string;
    source: { name: string };
    publishedAt: string;
    urlToImage: string;
    url: string;
  }[];
  displaySearchState: {
    title: string;
    author: string;
    description: string;
    content: string;
    source: { name: string };
    publishedAt: string;
    urlToImage: string;
    url: string;
  }[];
  modal: boolean;
  check: string;
  checked: boolean;
  token: string;
  conArticle: {
    title: string;
    author: string;
    description: string;
    content: string;
    source: { name: string };
    publishedAt: string;
    urlToImage: string;
    url: string;
  }[];
  libArticle: {
    title: string;
    author: string;
    description: string;
    content: string;
    source: { name: string };
    publishedAt: string;
    urlToImage: string;
    url: string;
  }[];
  redirect: boolean;
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
      modal: false,
      check: "",
      checked: false,
      token: "",
      conArticle: [],
      libArticle: [],
      redirect: false,
    };
  }

  //Fetches the News Data from NewsAPI
  async fetchNews() {
    console.log(NEWSDATA);

    try {
      let res = await fetch(`${NEWSDATA}`, {
        method: "GET",
      });
      let data = await res.json();
      console.log(data.articles.articles);
      await this.setState({
        articles: data.articles,
      });
      console.log(this.state.articles);
      
      await this.conservFilter();
      await this.liberalFilter();
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
      displaySearchState: results,
    });
  };

  conservFilter = () => {
    const conFilteredArr = this.state.articles.filter((conArticle) =>
      ["nypost.com", "foxnews.com", "theepochtimes.com"].some((address) =>
        conArticle.url.includes(address)
      )
    );
    this.setState({ conArticle: conFilteredArr });
    console.info(this.state.conArticle);
    console.info(this.state.articles);
  };

  liberalFilter = () => {
    const libFilteredArr = this.state.articles.filter((libArticle) =>
      libArticle.source.name.includes("CNN")
    );
    this.setState({ libArticle: libFilteredArr });
    console.info(this.state.libArticle);
    console.info(this.state.articles);
  };
  //Flips the modal for update UpdateModal component
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  //Takes an article and adds or removes it from the checkArticles array
  saveArticle = async (
    article: {
      title: string;
      author: string;
      description: string;
      content: string;
      source: { name: string };
      publishedAt: string;
      urlToImage: string;
      url: string;
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

  toLogin = () => {
    this.setState({
      redirect: !this.state.redirect,
    });
  };
  //display conditional
  displayFunction = () => {
    if (this.state.displaySearchState.length > 0) {
      return this.state.displaySearchState.map((article, index) => (
        <Container>
          <Card className='d-flex justify-content-between py-5 px-2'>
            <ListGroupItem
              className='news ListGroupItem d-flex align-items-center'
              key={article.title}
            >
              <a href={article.url}>Link to Article</a>
              {article.publishedAt}
              {article.source.name} <br /> {article.title} <br />{" "}
              {article.content}{" "}
              <CardImg className='newsPics' src={article.urlToImage} />
              {this.props.token !== "" ? (
                <Input
                  type='checkbox'
                  onChange={(e) => {
                    this.saveArticle(article, e.target.checked);
                  }}
                />
              ) : (
                <> </>
              )}
            </ListGroupItem>
          </Card>
        </Container>
      ));
    } else if (this.state.articles && this.props.colorMode === false) {
      return this.state.libArticle.map((article, index) => (
        <Container>
          <Card className='d-flex justify-content-between py-5 px-2'>
            {article.source.name === "CNN" ||
            article.source.name === "The Washington Post" ||
            article.source.name === "VOX" ? (
              <ListGroupItem className='newsLi d-flex justify-content-between'>
                {" "}
                <a href={article.url} className='d-flex align-self-center ms-2'>
                  Link to Article
                </a>
                <Container className='d-flex flex-column'>
                  <CardImg
                    className='newsPics align-self-center'
                    src={article.urlToImage}
                  />
                  <h3 className='d-flex align-self-center'>{article.title}</h3>{" "}
                  <p className='d-flex align-self-center'>
                    {article.source.name}
                  </p>
                  <p>{article.publishedAt}</p>
                  <p>{article.content}</p>
                  <br />
                </Container>
                <div className='mx-auto'>
                  {this.props.token !== "" ? (
                    <>
                      {" "}
                      <Input
                        className='mx-3'
                        value='new'
                        type='checkbox'
                        onChange={(e) => {
                          this.saveArticle(article, e.target.checked);
                        }}
                      />
                      <br />
                      <p className='mx-3'>Add Article to Entry</p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </ListGroupItem>
            ) : undefined}
          </Card>
        </Container>
      ));
    } else if (this.state.articles && this.props.colorMode === true) {
      return this.state.conArticle.map((article, index) => (
        <Container>
          <Card
            key={article.title}
            className='d-flex justify-content-between py-5 px-2'
          >
            {article.source.name === "New York Post" ||
            article.source.name === "Fox News" ||
            article.source.name === "The Epoch Times" ? (
              <ListGroupItem className='newsLi d-flex justify-content-between'>
                {" "}
                <a href={article.url} className='d-flex align-self-center ms-2'>
                  Link to Article
                </a>
                <Container className='d-flex flex-column'>
                  <CardImg
                    className='newsPics align-self-center'
                    src={article.urlToImage}
                  />
                  <h3 className='d-flex align-self-center'>{article.title}</h3>{" "}
                  <p className='d-flex align-self-center'>
                    {article.source.name}
                  </p>
                  <p>{article.publishedAt}</p>
                  <p>{article.content}</p>
                  <br />
                </Container>
                <div className='mx-auto'>
                  {this.props.token !== "" ? (
                    <>
                      {" "}
                      <Input
                        className='mx-3'
                        value='new'
                        type='checkbox'
                        onChange={(e) => {
                          this.saveArticle(article, e.target.checked);
                        }}
                      />
                      <br />
                      <p className='mx-3'>Add Article to Entry</p>{" "}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </ListGroupItem>
            ) : undefined}
          </Card>
        </Container>
      ));
    } else {
      console.log("error");
    }
  };

  //Lifecycle methods
  componentDidMount() {
    this.fetchNews();
    this.props.closeNav();
  }

  componentWillUnmount() {
    this.setState({
      checkedArticles: [],
      filteredArticles: [],
      searchTerm: [],
      displaySearchState: [],
      dataResponse: [],
    });
  }

  render() {
    return (
      <>
        {this.state.redirect === true ? (
          <Redirect
            to={{
              pathname: "/Portal",
            }}
            push
          />
        ) : (
          <Container className='ms-1'>
            <>
              {this.props.token !== "" ? (
                <>
                  <ModalLink
                    articles={this.state.checkedArticles}
                    token={this.props.token}
                  />
                  <UpdateModal
                    articles={this.state.checkedArticles}
                    token={this.props.token}
                  />{" "}
                </>
              ) : (
                <div className='d-flex justify-content-center mb-3'>
                  <Button className='mx-auto' onClick={() => this.toLogin()}>
                    Login to Save Articles
                  </Button>
                </div>
              )}
              <Form className='search-bar d-flex justify-content-center mb-3'>
                <input
                  placeholder='Search News'
                  onChange={(e) => this.setSearch(e.target.value)}
                />
              </Form>

              <ul>{this.displayFunction()} </ul>
            </>
          </Container>
        )}
      </>
    );
  }
}

export default SearchNews;
