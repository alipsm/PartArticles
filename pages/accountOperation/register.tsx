import React, { useState } from "react";
import Router from "next/router";
import RegisterForm from "../../components/Auth/Forms/Loging&Register/Register";
import { useToast } from "../../components/ui/Toastify/ToolTipsContext";
import useFormValidation from "../../hooks/useFormValidation";
import useUserRegistration from "../../hooks/useRegistration";

export default function Register() {

  const [loading, setLoading] = useState(false)

  const {showToast}=useToast()
  const { getValidation } = useFormValidation();
  const { register } = useUserRegistration();

  const [inputError, setInputError] = useState({name:"",text:""})

  const handleSubmitRegisterForm=async(e:object)=>{
    const { status, message ,field} = getValidation(e);
    if (status) {
      const token=e["g-recaptcha-response"];
      delete e["g-recaptcha-response"]
      try {
        setLoading(true)
        const data=await register(e,token)
        localStorage.setItem("token",data.token);
        Router.replace("/dashboard")
      } catch (error) {
        showToast({text:error.message,type:"Error"})
      }finally{
        setLoading(false)
      }
    } else {
      setInputError({name:field,text:message})
      showToast({text:message,type:"Error"})
    }
  }

  return (
    <div id="RegisterPage">
      <div>
        <RegisterForm onSubmitForm={handleSubmitRegisterForm} setInputError={{name:inputError.name,text:inputError.text}} isLoading={loading}/>
      </div>
    </div>
  );
}
