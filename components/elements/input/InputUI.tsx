import React from 'react'
import inputStyles from './_style.module.scss'

interface InputUiProps{
  title?:string,
  fullWidth?:boolean,
  error?:string,
  require?:boolean,
  getInputValue?:Function

}
export default function InputUI(props:InputUiProps) {
  return (
    <div id={inputStyles.InputUi} className={`${props.fullWidth&&inputStyles.fullWidth}`}>
      <Title text={props.title} error={props.error} require={props.require}/>
      <input type={"text"} className="" onChange={e=>handleChange(props.getInputValue,e)}/>
      <ErrorText error={props.error}/>
    </div>
  )
}

const Title=({text,error,require})=>{
  if (!text) return null    
  return <p className={`${inputStyles.title} ${!!error?inputStyles.error:""}`}>{text}<span className={inputStyles.require}>{require&&"*"}</span></p>
}

const ErrorText=({error})=>{
  if (!error) return null    
  return <p className={inputStyles.errorText}>{error}</p>
}


// input action => onChange
const handleChange=(setValu,e)=>{
  const text=e.target?.value;
  if (!setValu) return ""
  setValu(text)
}