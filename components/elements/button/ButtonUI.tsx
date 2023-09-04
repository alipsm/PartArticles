import Image, { StaticImageData } from "next/image";
import React from "react";
import btnStyles from "./_style.module.scss";

interface myProps {
  text?: string;
  type?: "Primary" | "Secondary" | "Tertiary";
  fullWidth?: boolean;
  onButtonClicked?: () => void;
  fontSize?: number;
  image?: { src: StaticImageData | string; alt: string };
  disable?: boolean;
  classes?: string;
}

export default function ButtonUI(props: myProps) {
  return (
    <div id={btnStyles.ButtonUi} className={`${props.classes}`}>
      <button
        onClick={() =>
          !props.disable&&props.onButtonClicked != undefined ? props.onButtonClicked() : ""
        }
        className={`${btnStyles.btnBaseStyle} ${
          !!props.type ? btnStyles[props.type] : btnStyles.Primary
        } ${props.disable && btnStyles.disable} ${
          props.fullWidth && btnStyles.fullWidth
        }`}
        style={{ fontSize: props.fontSize }}>
        {!!props.image && (
          <Image
            priority={true}
            src={props.image.src}
            alt={props.image.alt}
            width={28}
          />
        )}
        {props.text}
      </button>
    </div>
  );
}
