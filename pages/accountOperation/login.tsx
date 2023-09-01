import  Router  from "next/router";
import React, { useState } from "react";
import LoginForm from "../../components/Auth/Forms/Loging&Register/Login";
import { useToast } from "../../components/ui/Tooltip/ToolTipsContext";
import useFormValidation from "../../hooks/useFormValidation";
import useUserLogination from "../../hooks/useLogination";

export default function Login() {

    const {showToast}=useToast()
    const { getValidation } = useFormValidation();
    const { login } = useUserLogination();

    const [inputError, setInputError] = useState({name:"",text:""})

    const handleSubmitRegisterForm=async(e:object)=>{
        const { status, message ,field} = getValidation(e);
        if (status) {
          try {
            const data=await login(e)
            localStorage.setItem("token",data.token);
            console.log( "api data is:",data)
            Router.replace("/dashboard")
          } catch (error) {
            showToast({text:error.message,type:"Error"})
          }
        } else {
          setInputError({name:field,text:message})
          showToast({text:message,type:"Error"})
        }
      }

  return (
    <div id="LoginPage">
      <div>
        <LoginForm onSubmitForm={handleSubmitRegisterForm} setInputError={{name:inputError.name,text:inputError.text}}/>
      </div>
    </div>
  );
}
