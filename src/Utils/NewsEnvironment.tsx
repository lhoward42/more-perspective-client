

let NEWSDATA = "" || {};

switch (window.location.hostname) {
  case "localhost" || "127.0.0.1": 
  NEWSDATA =  "https://newsapi.org/v2/everything?domains=cnn.com,foxnews.com,vox.com,nypost.com,theepochtimes.com,thewashingtonpost.com&apiKey=42f599c7ca48424caa76369e2aa73550"; 
    break;
  
  case "more-perspective-client-ljh.herokuapp.com":
  NEWSDATA =
    "dummydata.json";
}

export default NEWSDATA;
