import React from 'react'
import styles from './_style.module.scss'
import Image from 'next/image'
import type {tableInterface} from '../../types/tableInterface'

//picture
import arrowPicture from './img/arrow.png'

export default function Pagination(props:tableInterface) {
  return (
    <div id={styles.Pagination}>
      <Image priority={true} src={arrowPicture} alt="arrow"  height={14}/>
      <button>
        1
      </button>
      <Image priority={true} src={arrowPicture} alt="arrow"  height={14} />
    </div>
  )
}
