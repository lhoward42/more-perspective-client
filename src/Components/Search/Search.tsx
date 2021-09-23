import React, { Component } from "react";

type PassedProps = {};
type SearchState = {
  dataResponse: (string | number)[];
  articles: (string | number)[];
  titles: Array<string>;
  title: string;
  author: string;
  searchTerm: string;
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
      searchTerm: "",
    };
  }

  searchNews = () => {
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
  // setSearchTerm = (e) => {
  //     this.setState({
  //         searchTerm: e.target.value
  //     })
  //     }
  // }

  render() {
    const {} = this.props;
    return (
      <div>
        <div className='App'>
          <button className={"start"} onClick={() => this.searchNews()}>
            Start!
          </button>

          {/* <input onChange={(e) => this.setSearchTerm(e)}></input> */}
          { this.state.articles ? this.state.articles.map((article: any ) => (
              
            <div>
            {article.source.name}
     
            </div>
          )) : undefined}
        </div>
      </div>
    );
  }
}

export default SearchNews;
