import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import "../scss/errorPage.scss"
const ErrorPage = () => {
  const error = useRouteError()
  return (
    <div>
        <h1>Oops! Something went wrong</h1>
        <p>
          <strong>
            Error: {error.statusText} {error.status}
          </strong>
        </p>
        <Link to={"/"}>
        Go to Admin Page
        </Link>
    </div>
  )
}

export default ErrorPage