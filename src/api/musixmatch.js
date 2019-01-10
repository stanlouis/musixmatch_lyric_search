import axios from "axios";

/*
    https://cors-anywhere.herokuapp.com/
   to bypass Cross-Origin Resource Sharing (CORS) for localhost
*/
export default axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1",
  params: {
    apikey: process.env.REACT_APP_MM_KEY
  }
});
