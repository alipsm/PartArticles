import Image from "next/image";
import React from "react";
import styles from "./_styles.module.scss";

// import partIcon from "./img/partIco.png";
import partBlueSideIco from './img/partIco_blueSide.png'
import partRedSideIco from './img/partIco_redSide.png'

function Header({ title = "Title", description }) {
  return (
    <div id={styles.HeaderCards}>
        {/* <Image priority={true} src={partIcon} alt="part icon" width={65} /> */}
      <div className={styles.pictureContainer}>
      <Image priority={true} src={partBlueSideIco} alt="part icon" width={65} />
      <Image priority={true} src={partRedSideIco} alt="part icon" width={65} />

      </div>
      <p>{title}</p>
      <span>{description}</span>
    </div>
  );
}

module.exports = { Header };
