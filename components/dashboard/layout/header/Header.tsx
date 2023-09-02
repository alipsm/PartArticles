import React from 'react'
import styles from './_style.module.scss'

function Header({title="Title",onButtonClick}) {
  return (
    <div id={styles.Header}>
      <p>{title}</p>
      <div>d</div>
    </div>
  )
}

module.exports={Header}
