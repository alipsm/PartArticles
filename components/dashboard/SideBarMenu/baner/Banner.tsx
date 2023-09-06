import React from "react";
import styles from "./_style.module.scss";
import smilePicture from "./img/smile.png";
import Image from "next/image";

function Banner({ username = "username", email = "example@gmail.com" }) {
  return (
    <div id={styles.Banner}>
      <Image priority={true} src={smilePicture} alt="smile" width={64} />
      <div>
        <p>{username}</p>
        <span>{email}</span>
      </div>
    </div>
  );
}

module.exports = { Banner };
