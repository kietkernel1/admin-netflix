import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import fetchAll from '../CRUDProcess/getAll';
import "../scss/databaseTable.scss";
import deleteOne from "../CRUDProcess/deleteOne"
import { deleteData } from '../firebase';

const List = () => {
  const [input, setInput] = useState("");
  const [one, setOne] = useState({})
  const [display, setDisplay] = useState(false)
  const data = useSelector( state => state.moviesReducer.movies)

  const filterData = data.filter( item => item.title.includes(input))
  
  useEffect( ()=>{
    fetchAll("movies")
  },[])

  const confirmDelete = (movie) => {
    setDisplay(true)
    setOne(movie)
  }

  const handleDeleteOne= () => {
    try{
      deleteOne(one['_id'], "movie")
  
      const arrUrl = [
        one.img,
        one.imgSm,
        one.imgTitle,
        one.video,
        one.trailer
      ]
      arrUrl.forEach(item => {
        deleteData(item)
      })
      setDisplay(false)
    }catch(err){
      throw err
    }
  }

  const closeAlert = () =>{
    setDisplay(false)
  }

  const moviesHeader = [
      {field: "_id", headerName: "ID", width: 230},
      {field: "movieName", headerName: "Movie Name", width: 400, renderCell: (param)=>(
        <div className="nameWithImg" key={param.row.img}>
            <img src={param.row.img} alt = ""/> 
            {param.row.title}
        </div>
      )},
      {field: "genre", headerName: "Genre", width: 90},
      {field: "year", headerName: "Year", width: 60},
      {field: "limit", headerName: "Limit", width: 60},
      {field: "time", headerName: "Time", width: 140}
    ]

    const extraColumn= [
        {field: "action", headerName: "Action", width: 250, renderCell: (param)=>(
            <div className='cellAction' key={param.row['_id']}>
              <Link to={`/movies/detail/${param.row['_id']}`}>
                <span className='viewButton' >View</span>
              </Link>
                <span className='deleteButton' onClick={() => confirmDelete(param.row)}>Delete</span>
            </div>
        )}
    ]

  return (
    
    <div style={{ height: `400px` }} className="database-container">
      <div className="database-function">
        <div className="database-search">
          <SearchIcon />
          <input type="text" placeholder='Searching...' value={input} onChange={(e) => setInput(e.target.value)}/>
        </div>
        
        <div className="database-addBtn">
          <Link to={`/movies/new`}>
            <Button variant="outlined" >Add New</Button>
          </Link>
        </div>

      </div>

        <DataGrid
          
          rows={filterData}
          columns={moviesHeader.concat(extraColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          className="database-grid"
          getRowId={(row)=>row['_id']}
          disableColumnSelector
          disableSelectionOnClick
        />
        <Dialog
        open={display}
        onClose={closeAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth = "sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title"
          style={{
            fontWeight: 600,
            fontSize: "1.5rem"
          }}
        >
          Are you sure that delete one?
        </DialogTitle>
        <DialogActions
        >
          <Button onClick={handleDeleteOne} autoFocus size= "large" variant = "outlined">
            Agree
          </Button>

          <Button onClick={closeAlert}size= "large" color='error' variant = "outlined">
            Disagree</Button>
          </DialogActions>
      </Dialog>

    </div>

  )
}

export default List