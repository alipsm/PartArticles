import { useEffect, useState } from "react";
import Image from "next/image";
import tolStyles from "./_style.module.scss";
import { useToast } from "./ToolTipsContext";
import type { toastInterface } from "./types/interface";

const { ImageContainer } = require("./Images/index");

function ToastifyUi(props: toastInterface) {
  const { onRemove } = useToast();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    return () => {
      !visible&&onRemove(props.index)
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onRemove(props.index)
    }, 1000);
  };

  return (
    <div
      id={tolStyles.ToastifyUi}
      className={`${tolStyles[props.position]} ${tolStyles[props.type]} ${
        visible ? tolStyles.show : tolStyles.hidden
      }`}>
      <div className={tolStyles.messageParent}>
        <Image priority={true}
          src={ImageContainer[props.type]}
          alt={`${props.type} ico`}
          width={24}
        />
        <span>{props.text}</span>
      </div>
      <Image priority={true}
        src={ImageContainer[props.type + "Close"]}
        alt="close"
        width={14}
        onClick={() => handleClose()}
      />
    </div>
  );
}


export {ToastifyUi}