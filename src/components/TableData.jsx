import React, { useEffect, useState } from 'react'
import "../scss/tableData.scss"
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material/';
import databaseApi from '../callApi/databaseApi';

const TableData = ({type}) => {
  const [data, setData]= useState([])

  useEffect(()=>{
    const fetchNew= async()=>{
      try{
      const res= await databaseApi.getNew(type)
      setData(res);
      }catch(err){
        throw err 
      }
    }

    fetchNew();
  },[type])


  return (

      <TableContainer component={Paper} className='table-container'>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {type==="users"?
            <>
              <TableCell className='table-cell'>User name</TableCell>
              
            </>
            :<>
              <TableCell className='table-cell'>Movie</TableCell>
              <TableCell className='table-cell' align="center">Genre</TableCell>
              <TableCell className='table-cell' align="center">Limit</TableCell>
              <TableCell className='table-cell' align="center">Time</TableCell>
              <TableCell className='table-cell' align="center">Year</TableCell>
             
            </>
            }
           <TableCell className='table-cell' align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({username, title, genre, limit, time, year, profilePic, imgSm}) => (
            <TableRow
              key={username || title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell className='table-cell' component="th" scope="row">
                <div className='table-cell-item'>
                  <img src={profilePic || imgSm} alt="" />
                  <p>{username || title}</p>
                </div>
              </TableCell>

              {!username&&
              <>
              <TableCell className='table-cell' align="center">{genre}</TableCell>
              <TableCell className='table-cell' align="center">{limit}</TableCell>
              <TableCell className='table-cell' align="center">{time}</TableCell>
              <TableCell className='table-cell' align="center">{year}</TableCell>
              </>
              } 
                <TableCell className='table-cell' align="center"><p className='viewButton'>View</p></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableData