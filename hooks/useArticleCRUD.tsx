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
    const { getValidation } = useFormValidation();

    try {
      // if (!getValidation(formDataObject)) throw new Error("Empity value!");
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

  return { createArticle ,readMyArticle};
}