import { createContext, useReducer } from "react";
import {ON_DARKMODE, OFF_DARKMODE, INITIAL_STATE, reducer} from "./themeReducer"

export const ThemeContext= createContext();

const ThemeContextProvider = ({children}) => {
    const [state, dispatch]= useReducer(reducer, INITIAL_STATE)
    
    const handleOnOff=(mode)=>{
        if(mode==="On"){
            dispatch(ON_DARKMODE)
        }else{
            dispatch(OFF_DARKMODE)
        }

    }

  return (
    <ThemeContext.Provider value={{state, handleOnOff }}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider