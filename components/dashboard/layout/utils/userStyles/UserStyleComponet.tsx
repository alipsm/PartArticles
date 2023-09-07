import Image from "next/image";
import React from "react";
import styles from "./_styles.module.scss";
import userExamplePicture from "./img/user_image_test.png";
export default function MyHocUserStyles({ children }) {
  return (
    <div id={styles.MyHocUserStyles}>
      <Image src={userExamplePicture} alt="user picture" width={24} />
      <span>@</span>
      {children}
    </div>
  );
}
