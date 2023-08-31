import React from 'react'
import btnStyles from './_style.module.scss'

interface myProps{
  text?:string,
  type?:"Primary"|"Secondary"|"Tertiary",
  fullWidth?:boolean,
  onButtonClicked?:()=>void
}

export default function ButtonUI(props:myProps) {
  return (
    <div id={btnStyles.ButtonUi} className={`${props.fullWidth&&btnStyles.fullWidtdh}`}>
      <button onClick={()=>props.onButtonClicked!=undefined?props.onButtonClicked():""} className={`${btnStyles.btnBaseStyle} ${!!props.type?btnStyles[props.type]:btnStyles.Primary}`}>{props.text}</button>
    </div>
  )
}