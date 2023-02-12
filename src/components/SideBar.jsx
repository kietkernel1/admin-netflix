import React, { useContext } from 'react'
import "../scss/sideBar.scss"
import { Dashboard ,Person, PlayCircleFilledWhite, InsertChart, Notifications, Psychology, Settings, AccountCircle, Logout } from '@mui/icons-material';
import { Link, useNavigate } from "react-router-dom"
import { ThemeContext } from "../darkTheme/themeContextProvider"
import { fetchLogout } from "../loginProcess/fetchLogout"
import { useSelector } from 'react-redux';

const SideBar = () => {
    const { user } = useSelector(state => state.loginReducer)
    const context= useContext(ThemeContext)
    const navigate = useNavigate();
    const handleLogout= async()=>{
       await fetchLogout();
    }
  return (  
    <div className='sidebar-container'>
        <div className='sidebar-top'>
            <Link to="/">
            <span className='sidebar-logo'> Netflix Admin</span>
            </Link>
        </div>

        <div className='sidebar-middle'>
            <ul>
                <h5>MAIN</h5>

                <Link to="/admin">
                <li>
                    <Dashboard className="side-bar-icon" />
                    <span>Dashboard</span>
                </li>
                </Link>
                
                <h5>LISTS</h5>

                <Link to="/users" >
                <li>
                    <Person className="side-bar-icon" />
                    <span>Users</span> 
                </li>
                </Link>

                <Link to="/movies">
                <li>
                    <PlayCircleFilledWhite className="side-bar-icon" />
                    <span>Movies</span> 
                </li>
                </Link>

                <h5>USEFUL</h5>
                <li>
                    <InsertChart className="side-bar-icon" />
                    <span>Stats</span> 
                </li>

                <li>
                    <Notifications className="side-bar-icon" />
                    <span>Notification</span> 
                </li>

                <h5>SERVICE</h5>

                <li>
                    <Psychology className="side-bar-icon" />
                    <span>Logs</span> 
                </li>

                <li>
                    <Settings  className="side-bar-icon" />
                    <span>Settings</span> 
                </li>

                <h5>USER</h5>
                <li onClick={()=> navigate(`/users/detail/${user['_id']}`)}>
                    <AccountCircle  className="side-bar-icon" />
                    <span>Profile</span> 
                </li>

                <li onClick={handleLogout}>
                    <Logout  className="side-bar-icon" />
                    <span>Logout</span> 
                </li>

            </ul>
        </div>


        <div className='sidebar-bottom'>
            <span>Color theme:</span> 
            <div className='sidebar-color-theme' onClick={()=>context.handleOnOff("")}></div>
            <div className='sidebar-color-theme' onClick={()=>context.handleOnOff("On")}></div>
        </div>
    </div>
  )
}

export default SideBar