import Router from 'next/router'
import React, { useEffect } from 'react'
import SideBarMenu from '../../components/dashboard/SideBarMenu/SidebarMenu'
import MainDashboard from './[...section]'

export default function Dashboard() {
  useEffect(() => {
    Router.replace("/dashboard/articles")
  }, [])
  
  return (
    <div id='Dashboard'>
      <SideBarMenu/>
      <MainDashboard/>
    </div>
  )
}
