import React, { Component } from "react";

type PassedProps = {
  colorMode: boolean;
};
type SearchState = {
  dataResponse: (string | number)[];
  articles: {
    source: { name: string; id: string };
    title: string;
    content: string;
  }[];
  titles: Array<string>;
  title: string;
  author: string;
  searchTerm: {
    source: { name: string; id: string };
    title: string;
    content: string;
  }[];
  displaySearch: {
    source: { name: string; id: string };
    title: string;
    content: string;
  }[];
};

class SearchNews extends Component<PassedProps, SearchState> {
  constructor(props: PassedProps) {
    super(props);
    this.state = {
      dataResponse: [],
      articles: [],
      titles: [],
      title: "",
      author: "",
      searchTerm: [],
      displaySearch: []
    };
  }

  fetchNews = () => {
    const search = async () => {
      const API_KEY = `42f599c7ca48424caa76369e2aa73550`;
      await fetch(
        `https://newsapi.org/v2/everything?domains=cnn.com,foxnews.com,washingtonpost.com,nypost.com,theepochtimes.com,vox.com&apiKey=${API_KEY}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            articles: data.articles,
          });
          console.log(this.state.articles);
        });
    };
    search();
  };

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
        displaySearch: this.state.searchTerm
    })
  };

  displaySearchItem = () => {
    return this.state.displaySearch.map((article) => (
      <div>
        <>
          {" "}
          {article.source.name} <br /> {article.title} <br /> {article.content}{" "}
          <button>Save Article to Entries</button>{" "}
        </>
      </div>
    ));
  };
  displayRed = () => {
    return this.state.articles.map((article) => (
      <div>
        {article.source.name === "New York Post" ||
        article.source.name === "Fox News" ||
        article.source.name === "The Epoch Times" ? (
          <>
            {" "}
            {article.source.name} <br /> {article.title} <br />{" "}
            {article.content}{" "}
          </>
        ) : undefined}
      </div>
    ));
  };

  displayBlue = () => {
    return this.state.articles.map((article) => (
      <div>
        {article.source.name === "CNN" ||
        article.source.name === "VOX" ||
        article.source.name === "The Washington Post" ? (
          <>
            {" "}
            {article.source.name} <br /> {article.title} <br />{" "}
            {article.content} <button>Save Article to Entries</button>{" "}
          </>
        ) : undefined}
      </div>
    ));
  };

  render() {
    const {} = this.props;
    return (
      <div>
        <div className='App'>
          <button className={"start"} onClick={() => this.fetchNews()}>
            Start!
          </button>

          <fieldset>
            <input onChange={(e) => this.setSearch(e.target.value)} />
            <input
              type='submit'
              className={"start"}
              onClick={() => this.sendSearchResults()}
            />
          </fieldset>
        {this.displaySearchItem()}
          {this.state.articles && this.props.colorMode === false
            ? this.displayBlue()
            : this.displayRed()}
        </div>
      </div>
    );
  }
}

export default SearchNews;
