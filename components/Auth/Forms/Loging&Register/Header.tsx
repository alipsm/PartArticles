import Image from 'next/image';
import React from 'react'
import styles from "./_styles.module.scss";

import partIcon from './img/partIco.png'

function Header({title="Title",description}) {
  return (
    <div id={styles.HeaderCards}>
      <Image src={partIcon} alt="part icon" width={65}/>
      <p>{title}</p>
      <span>{description}</span>
    </div>
  )
}

module.exports={Header}
