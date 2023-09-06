import Image from "next/image";
import React from "react";
import styles from "../_style.module.scss";
import partLogo from "../img/partIco.png";

function Header() {
  return (
    <header id={styles.Header}>
      <Image priority={true} src={partLogo} alt="part logo" width={64} />
      <div>
        <p>Part Software Group</p>
        <span>Challenge</span>
      </div>
    </header>
  );
}

module.exports = { Header };
