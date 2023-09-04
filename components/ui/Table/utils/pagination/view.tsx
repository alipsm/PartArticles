import React, { useEffect } from 'react'
import styles from './_style.module.scss'
import Image from 'next/image'

//picture
import arrowPicture from './img/arrow.png'

// const {paginationHandler} = require("./controller.tsx")

function View({currentPage,handleOnClick}) {
  return (
    <div id={styles.Pagination}>
      <Image priority={true} src={arrowPicture} alt="arrow"  height={14} onClick={()=>handleOnClick("prev")}/>
      <button>
        {currentPage}
      </button>
      <Image priority={true} src={arrowPicture} alt="arrow"  height={14} onClick={()=>handleOnClick("next")}/>
    </div>
  )
}

module.exports={View}
