import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import fetchAll from '../CRUDProcess/getAll';
import "../scss/databaseTable.scss";
import deleteOne from "../CRUDProcess/deleteOne"
import { deleteData } from '../firebase';


const List = () => {
  const [input, setInput]= useState("");
  const [one, setOne] = useState({id: null, urlAvatar: null})
  const [open, setOpen] = useState(false)
  const {users, message} = useSelector( state => state.usersReducer)
  const dispatch = useDispatch()
  const filterData = users.filter( item => item.username.includes(input))
  
  useEffect( ()=>{
    fetchAll("users")
  },[])
  
  const confirmDelete = (id, urlAvatar) => {
    setOne({id: id, urlAvatar: urlAvatar})
    setOpen(true)
  }

  const handleClose = ()=> {
    setOpen(false)
  } 

  const handleDeleteOne=()=>{
    setOpen(false)
    deleteOne(one.id, "user")
    if(one.urlAvatar !== "https://app.dr-psy.com/template/default-avatar.jpg"){
    deleteData(one.urlAvatar)
    }
    
    
  }

  const handleResetError = ()=>{
    setOpen(false)
    dispatch({
      type: "RESET-MESSAGE"})
  }
const usersHeader = [
    {field: "_id", headerName: "ID", width: 250, key:"1"},
    {field: "username", headerName: "User Name", width: 300, renderCell: (param )=>(
        <div className="nameWithImg" >
            <img src={param.row.avatar} alt = ""/>
            {param.row.username}
        </div>
    )},
    {field: "email", headerName: "Email", width: 100, key:"1"},
    {field: "isAdmin", headerName: "Admin", width: 100, key:"1"},
    {field: "Created at", headerName: "Created At", width: 150, renderCell: (param) => (
        <p >{param.row.createdAt.split("T")[0]}</p>
    )},
    {field: "UpdatedAt", headerName: "Updated At", width: 150, renderCell: (param) => (
        <p >{param.row.updatedAt.split("T")[0]}</p>
    )}
    ]

    const extraColumn= [
        {field: "action", headerName: "Action", width: 250, renderCell: (param)=>(
            <div className='cellAction' >
              <Link to={`/users/detail/${param.row['_id']}`}>
                <span className='viewButton' >View</span>
              </Link>
                <span className='deleteButton' onClick={ ()=>confirmDelete(param.row['_id'], param.row.avatar)}>Delete</span>
            </div>
        )}
    ]

  return (
    
    <div style={{ height: `600px` }} className="database-container">
      <div className="database-function">
        <div className="database-search">
          <SearchIcon />
          <input type="text" placeholder='Searching...' value={input} onChange={(e) => setInput(e.target.value)}/>
        </div>

        <div className="database-addBtn">
          <Link to={`/users/new`}>
            <Button variant="outlined" >Add New</Button>
          </Link>
        </div>

      </div>

      <DataGrid
        rows={filterData}
        columns={usersHeader.concat(extraColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        className="database-grid"
        getRowId={(row)=>row['_id']}
        disableColumnSelector
        disableSelectionOnClick
      />

      <Dialog
        open={open}
        onClose={handleClose}
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

          <Button onClick={handleClose}size= "large" color='error' variant = "outlined">
            Disagree</Button>
          </DialogActions>
      </Dialog>

      <Dialog
        open={message.error||false}
        onClose={handleResetError}
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
          {message.error}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleResetError} autoFocus size= "large" variant = "outlined">
            Got it!!
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  )
}

export default List