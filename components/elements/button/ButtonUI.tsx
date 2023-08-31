import React from 'react'
// import './style.scss'

interface myProps{
  text?:string,
  type?:"Primary"|"Secondary"|"Tertiary",
  fullWidth?:boolean,
  onButtonClicked?:()=>void
}

export default function ButtonUI(props:myProps) {
  return (
    <div id='ButtonUi' className={`${props.fullWidth&&"fullWidth"}`}>
      <button onClick={()=>props.onButtonClicked!=undefined?props.onButtonClicked():""} className={`btnBaseStyle ${!!props.type?props.type:"Primary"}`}>{props.text}</button>
    </div>
  )
}
