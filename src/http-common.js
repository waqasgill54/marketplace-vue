import axios from "axios";

export default axios.create({
  baseURL: "http://marketplace.test/api",
  headers: {
    "Content-type": "application/json"
  }
});
