import React, { useEffect, useState } from "react";
import Image from "next/image";

// styles
import styles from "./_styles.module.scss";

// picture
import logoPicture from "./img/ico.png";
import bannerPicture from "./img/banner.png";

export default function UserEntryAnimation() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
        setShow(false);
    }, 4000);
  }, []);
  if (!show)return null
    return (
      <div id={styles.UserEntryAnimation}>
        <div className={styles.container}>
          <div>
            <Image
              src={logoPicture}
              alt={"part logo"}
              className={styles.logo}
              width={244}
            />
            <Image
              src={bannerPicture}
              alt="part banner"
              className={styles.banner}
              width={244}
            />
          </div>
        </div>
      </div>
    );
}
