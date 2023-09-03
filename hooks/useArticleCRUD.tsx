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
      if (status == 201) {
        return data;
      }
      throw new Error("Please try again status code:" + status);
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  async function deleteArticle(articleId:string) {
    const { getValidation } = useFormValidation();

    try {
      console.log('articleId', articleId)
      const token= localStorage.getItem("token");
      if (!!!token) throw new Error("Token is Empity!")
      const { data, status } = await axios
        .delete(`/api/handlers/article/delete`, {
          headers: {
            "Content-Type": "application/json",
            token: token || "",
            "article-id":articleId || ""
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


  return { createArticle ,readMyArticle,deleteArticle};
}