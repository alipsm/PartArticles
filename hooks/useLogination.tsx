import useApi from "./useApi/useApi";
import useFormValidation from "./useFormValidation";

export default function useUserLogination() {
  const {post} = useApi()
  async function login(formDataObject: object) {
    const { getValidation } = useFormValidation();

    try {
      if (!getValidation(formDataObject)) throw new Error("Empity value!");
      try {
        const data= await post("/user/login",formDataObject)
        localStorage.setItem("UnimportantUserData",`${data.username +","+data.email}`)
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