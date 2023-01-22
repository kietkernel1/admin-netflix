import React, { useEffect, useState } from 'react'
import "../scss/columnChart.scss"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import usersApi from "../callApi/userApi"

const ColumnChart = ({aspect, title}) => {
  const [stats, setStats ]= useState([])

  const MONTHS=[
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

  useEffect(()=>{
     const fetchUserStats= async ()=>{
      try{
        const res= await usersApi.getStat()
        const data= res.reduce((result,cur)=>{
          return [...result, {month: MONTHS[cur._id-1], Total: cur.total}]
        }
          ,[]) 
        setStats(data);
      }catch(err){
        throw err
      }
     }
     fetchUserStats();
  },[])

  return (
    <div className='column-container'>
        <div className="column-title">{title}</div>
        <ResponsiveContainer width="100%" aspect={aspect} >
                <AreaChart width={730} height={250} data={stats}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }} >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1" >
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className="grid-chart" />
          <Tooltip />
          <Area type="monotone" dataKey="Total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />

        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ColumnChart