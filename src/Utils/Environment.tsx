let APIURL = "";

switch(window.location.hostname){
    case 'localhost' || '127.0.0.1':
    APIURL = 'http://localhost:3001';
    break;
    case 'more-perspective-ljh.herokuapp.com':
    APIURL = 'https://more-perspective-ljh.herokuapp.com'

}

export default APIURL;