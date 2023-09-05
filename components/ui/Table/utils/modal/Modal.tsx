import Image from "next/image";
import React, { useMemo, useState } from "react";
import styles from "./_styles.module.scss";

import closePicture from "./img/close.png";

export default function DeleteArticleModal({
  showModal,
  articleTitle = "article name",
  onClose,
  onDelete,
}) {
  if (!showModal) {
    return null;
  }

  const memoizedDeleteArticleModal = useMemo(
    () => (
      <div id={styles.Modal}>
        <div className={styles.container}>
          <header>
            <h2>Delete Article</h2>
            <div onClick={() => onClose()}>
              <Image src={closePicture} alt="close" width={12} />
            </div>
          </header>
          <main>
            Article {articleTitle} will be removed and can not be restored. Are
            you sure you want to delete article?
          </main>
          <footer>
            <button className={styles.cancele} onClick={() => onClose()}>
              Don't Delete
            </button>
            <button className={styles.delete} onClick={() => onDelete()}>
              Delete Article
            </button>
          </footer>
        </div>
      </div>
    ),
    []
  );
  return memoizedDeleteArticleModal;
}

// module.exports={Modal}
