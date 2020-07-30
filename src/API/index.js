import axios from "axios";

export default axios.create({
    baseURL: 'https://bubblyfast.herokuapp.com',
    withCredentials: true
});
