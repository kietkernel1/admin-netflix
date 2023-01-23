import React from 'react'
import { useLocation } from 'react-router-dom'

const Redirect = ({children}) => {
    const pathname = useLocation().pathname
    console.log(pathname)

  return (
    <div>
        {children}
    </div>
  )
}

export default Redirect