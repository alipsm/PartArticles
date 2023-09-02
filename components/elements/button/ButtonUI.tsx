import Image, { StaticImageData } from "next/image";
import React from "react";
import btnStyles from "./_style.module.scss";

interface myProps {
  text?: string;
  type?: "Primary" | "Secondary" | "Tertiary";
  fullWidth?: boolean;
  onButtonClicked?: () => void;
  fontSize?:number,
  image?:{src:StaticImageData|string,alt:string}
  disable?:boolean
}

export default function ButtonUI(props: myProps) {
  return (
    <div
      id={btnStyles.ButtonUi}
      className={`${props.fullWidth && btnStyles.fullWidtdh}`}>
        
      <button
        onClick={() =>
          props.onButtonClicked != undefined ? props.onButtonClicked() : ""
        }
        className={`${btnStyles.btnBaseStyle} ${
          !!props.type ? btnStyles[props.type] : btnStyles.Primary
        } ${props.disable&& btnStyles.disable}`}
        style={{"fontSize":props.fontSize}}>
        {!!props.image&&<Image src={props.image.src} alt={props.image.alt} width={28}/>}
        {props.text}
      </button>
    </div>
  );
}
