import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()
  return (
    <div style={{textAlign: "center", marginTop: "20vh"}}>
        <h1 style={{fontSize: "5rem"}}>Oops! Something went wrong</h1>
        <p>
          <strong style={{fontSize: "4rem"}}>
            Error: {error.status} {error.statusText}
          </strong>
        </p>
        <Link to={"/"}  style={{ fontSize: "3rem", fontStyle: "italic", color: "blue"}}>
        Go to Admin Page
        </Link>
    </div>
  )
}

export default ErrorPage