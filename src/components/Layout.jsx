import NavBar from "./NavBar"
import SideBar from './SideBar'
import "../scss/home.scss"
import { Outlet } from "react-router-dom"
import React, { useContext } from "react"
import { ThemeContext } from "../darkTheme/themeContextProvider"

const Layout = () => {
  const context = useContext(ThemeContext);
    
  return (
    <div className={`home-container app ${context.state}`}>
        <SideBar />
      <div className='home-content'>
        <NavBar />
        <Outlet/>
      </div>
      </div>
  )
}

export default Layout