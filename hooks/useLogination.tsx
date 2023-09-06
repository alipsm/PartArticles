import axios from "axios";
import useFormValidation from "./useFormValidation";

export default function useUserLogination() {
  async function login(formDataObject: object) {
    const { getValidation } = useFormValidation();

    try {
      if (!getValidation(formDataObject)) throw new Error("Empity value!");
      try {
        const { data, status } = await axios
        .post("/api/handlers/user/login", formDataObject, {
          headers: {
            "Content-Type": "application/json"
          },
        })
        .catch((e) => {
          throw new Error(e.response.data.message);
        });
      if (status == 201) {
        localStorage.setItem("UnimportantUserData",`${data.username +","+data.email}`)
        return data;
      }
        return data
      } catch (error) {
        throw new Error(error.message)
      }
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  
  return { login };
}