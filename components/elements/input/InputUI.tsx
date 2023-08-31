import React from 'react'


interface InputUiProps{
  title?:string,
  fullWidth?:boolean,
  error?:string,
  require?:boolean,
  getInputValue?:Function

}
export default function InputUI(props:InputUiProps) {
  return (
    <div id='InputUi' className={`${props.fullWidth&&"fullWidth"}`}>
      <Title text={props.title} error={props.error} require={props.require}/>
      <input type={"text"} className="" onChange={e=>{props.getInputValue(e.target.value)}}/>
      <ErrorText error={props.error}/>
    </div>
  )
}

const Title=({text,error,require})=>{
  if (!text) return null    
  return <p className={`title ${!!error?"error":""}`}>{text}<span className='require'>{require&&"*"}</span></p>
}

const ErrorText=({error})=>{
  if (!error) return null    
  return <p className={`errorText`}>{error}</p>
}
