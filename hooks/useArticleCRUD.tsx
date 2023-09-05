import axios from "axios";
import useFormValidation from "./useFormValidation";

export default function useArticleCRUD() {
  async function createArticle(formDataObject: object, token: string) {
    const { getValidation } = useFormValidation();

    try {
      if (!getValidation(formDataObject)) throw new Error("Empity value!");
      const { data, status } = await axios
        .post("/api/handlers/article/create", formDataObject, {
          headers: {
            "Content-Type": "application/json",
            token: token || "",
          },
        })
        .catch((e) => {
          throw new Error(e.response.data.message);
        });
      if (status == 201) {
        return data;
      }
      throw new Error("Please try again status code:" + status);
    } catch (error: any) {
      throw Error(error.message);
    }
  }
  async function readMyArticle() {

    try {
      const token= localStorage.getItem("token");
      if (!!!token) throw new Error("Token is Empity!")
      const { data, status } = await axios
        .get("/api/handlers/article/all", {
          headers: {
            "Content-Type": "application/json",
            token: token || "",
          },
        })
        .catch((e) => {
          throw new Error(e.response.data.message);
        });
      if (status == 200) {
        return data;
      }
      throw new Error("Please try again status code:" + status);
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  async function deleteArticle(articleID:string) {
    try {
      const token= localStorage.getItem("token");
      if (!!!token) throw new Error("Token is Empity!")
      const { data, status } = await axios
        .delete(`/api/handlers/article/delete`, {
          headers: {
            "Content-Type": "application/json",
            token: token || "",
            "article-id":articleID || ""
          },
        })
        .catch((e) => {
          throw new Error(e.response.data.message);
        });
      if (status == 200) {
        return data;
      }
      throw new Error("Please try again status code:" + status);
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  async function editArticle(formDataObject:object,articleID:string) {
    try {
      const token= localStorage.getItem("token");
      if (!!!token) throw new Error("Token is Empity!")
      const { data, status } = await axios
        .put(`/api/handlers/article/edit`,formDataObject, {
          headers: {
            "Content-Type": "application/json",
            token: token || "",
            "article-id":articleID || ""
          },
        })
        .catch((e) => {
          throw new Error(e.response.data.message);
        });
      if (status == 204) {
        return true;
      }
      throw new Error("Please try again status code:" + status);
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  return { createArticle ,readMyArticle,deleteArticle,editArticle};
}