import React, { useEffect } from "react";
import ButtonUI from "../components/elements/button/ButtonUI";
import { useToast } from "../components/ui/Toastify/ToolTipsContext";

export default function Home() {
  const {toasts,setToasts,onRemove,showToast} = useToast()

  function showTol() {
    showToast({text:"example",type:"Error",index:Math.floor(Math.random()*100)})
  }
  return (
    <div className="parent">
      <ButtonUI onButtonClicked={showTol}/>
    </div>
  );
}
