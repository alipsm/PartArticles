import Router from 'next/router'
import React, { useEffect } from 'react'
import MainDashboard from './[...section]'

export default function Dashboard() {
  useEffect(() => {
    // setTimeout(() => {
      typeof window !=undefined&& Router.replace("/dashboard/articles")
    // }, 4000);
  }, [])
  
  return (
    <div id='Dashboard'>
      <MainDashboard/>
    </div>
  )
}
