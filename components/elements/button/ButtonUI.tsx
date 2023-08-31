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
    <div id='ButtonUi'>
      <button onClick={()=>props.onButtonClicked!=undefined?props.onButtonClicked():""} className={`btnBaseStyle ${props.type} ${props.fullWidth&&"fullWidth"}`}>{props.text}</button>
    </div>
  )
}
