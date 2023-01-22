import React from 'react'
import ColumnChart from "../components/ColumnChart"
import TableData from "../components/TableData"
import ProgressBar from "../components/ProgressBar"
import Widget from '../components/Widget'

const Dashboard = () => {
  return (
    <div>
      <div className="home-widgets">
            <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" />
          </div>

          <div className="home-charts">
            <ProgressBar />
            <ColumnChart aspect={2/1} tittle= "Previous Revenue"/>
          </div>

          <div className="home-list-container">
            <div className="home-list-user">
              <h1 className="home-list-title">Latest User</h1>
              <TableData type="users"/>
            </div>
            <div className="home-list-movie">
              <h1 className="home-list-title">Latest Movie</h1>
              <TableData type="movies"/>
            </div>
          </div>
    </div>
  )
}

export default Dashboard