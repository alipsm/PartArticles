import React from 'react'
import ButtonUI from '../components/elements/button/ButtonUI'
// import '../styles/style.css'

export default function Home() {
  function myFun() {
    
  }
  return (<div className='parent'><ButtonUI onButtonClicked={myFun} text={"Sign up"} type={"Tertiary"} fullWidth/></div>)
}
