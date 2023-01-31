import React, { useContext } from 'react'
import { ThemeContext } from '../darkTheme/themeContextProvider';
import "../scss/navBar.scss"
import { Language, DarkModeOutlined, NotificationsNone, ChatBubbleOutline, List } from '@mui/icons-material';
import { useSelector } from "react-redux"
const NavBar = () => {
  const context= useContext(ThemeContext)
  const { user } = useSelector(state=> state.loginReducer)
  return (
    <div className='navbar-container'>
      
      <div className="navbar-option">
        <div className="navbar-item">
          <Language className='navbar-icon '/>
          <span>English</span> 
        </div>
        
        <div className="navbar-item" onClick={()=>context.handleOnOff(context.state?"":"On")}> 
          <DarkModeOutlined className='navbar-icon'/>
        </div>

        <div className="navbar-item">
          <NotificationsNone className='navbar-icon' />
          <span className="counter">1</span>
        </div>

        <div className="navbar-item">
          <ChatBubbleOutline className='navbar-icon' />
          <span className="counter">1</span>
        </div>

        <div className="navbar-item">
          <List className='navbar-icon' />
        </div>

        <div className="navbar-item">
          <img src={user.avatar} alt="" className="navbar-avatar" />
        </div>

      </div>
    </div>
  )
}

export default NavBar