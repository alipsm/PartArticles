import axios from "axios";
import useFormValidation from "./useFormValidation";

export default function useUserRegistration() {
  async function register(formDataObject: object, token: string) {
    const { getValidation } = useFormValidation();

    try {
      if (!getValidation(formDataObject)) throw new Error("Empity value!");
      const { data, status } = await axios
        .post("/api/handlers/user/register", formDataObject, {
          headers: {
            "Content-Type": "application/json",
            authorization: token || "",
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

  return { register };
}