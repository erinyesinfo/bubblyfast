import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_SERVER_API_KEY,
    withCredentials: true
});
