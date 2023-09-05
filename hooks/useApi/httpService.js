import axios from "axios";

const token = localStorage.getItem("token");
if (token !== "undefined" && token != null && token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}