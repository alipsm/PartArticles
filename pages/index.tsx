import  Router from "next/router";
import React, { useEffect } from "react";
import ButtonUI from "../components/elements/button/ButtonUI";
import { useToast } from "../components/ui/Toastify/ToolTipsContext";

export default function Home() {
  useEffect(() => {
    Router.push("/accountOperation/login")
  }, [])
  
  return (
   <div></div>
  );
}
