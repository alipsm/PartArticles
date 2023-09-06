import React from "react";
import Image from "next/image";
import styles from "./_style.module.scss";
import editPicture from "./img/edit.png";
import deletePicture from "./img/delete.png";

function Actions({ onDelete, onEdite, item }) {
  return(<div id={styles.Actions}>
    <div className={styles.delete} onClick={() => onDelete(item)}>
      <Image priority={true} src={deletePicture} alt="delete" width={20} />
    </div>
    <div className={styles.edit} onClick={() => onEdite(item)}>
      <Image priority={true} src={editPicture} alt="edit" width={20} />
    </div>
  </div>)
}

module.exports={Actions}