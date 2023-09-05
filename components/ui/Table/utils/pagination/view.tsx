import React, { useEffect } from "react";
import styles from "./_style.module.scss";
import Image from "next/image";

//picture
import arrowPicture from "./img/arrow.png";

// const {paginationHandler} = require("./controller.tsx")
function View({ currentPage, handleOnClick, totalPage }) {
  console.log('currentPage', currentPage)
  console.log('totalPage', totalPage)
  return (
    <div id={styles.Pagination}>
      <Image
        priority={true}
        src={arrowPicture}
        alt="arrow"
        height={14}
        onClick={() => handleOnClick("prev")}
        hidden={currentPage==1}
      />
      {currentPage > 1 && <button onClick={() => handleOnClick("prev")}>{currentPage - 1}</button>}
      <button >{currentPage}</button>
      {currentPage < totalPage && <button onClick={() => handleOnClick("next")}>{currentPage + 1}</button>}
      <Image
        priority={true}
        src={arrowPicture}
        alt="arrow"
        height={14}
        onClick={() => handleOnClick("next")}
        hidden={currentPage==totalPage}
      />
    </div>
  );
}

module.exports = { View };
