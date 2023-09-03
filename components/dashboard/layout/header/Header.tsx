import React from 'react'
import ButtonUI from '../../../elements/button/ButtonUI'
import styles from './_style.module.scss'

function Header({title="Title",onButtonClick,buttonText="",buttonImage}) {
  return (
    <div id={styles.Header}>
      <p>{title}</p>
      {!!onButtonClick&&<ButtonUI onButtonClicked={onButtonClick} text={buttonText} image={{src:buttonImage,alt:"add"}}/>}
      
    </div>
  )
}

module.exports={Header}
