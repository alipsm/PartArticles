import axios from "axios";
import { useEffect } from "react";
import config from './config.json'
export default function useApi() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "undefined" && token != null && token) {
      axios.defaults.headers.common["Authorization"] = `${token}`
    }
    axios.defaults.headers.common["Content-Type"] = "application/json"
  }, [])
  
  async function post(path: string,body?:any) {

    try {
      const { data, status } = await axios
        .post(config.baseUrl+path, body)
        .catch((e) => {
          throw new Error(e.response.data.message);
        });
      if (status == 200||status==201||status==204) {
        return data;
      }
      throw new Error("Please try again status code:" + status);
    } catch (error: any) {
      throw Error(error.message);
    }
  }
  return { post };
}