import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import "../scss/new.scss"
import { Input, Box, InputLabel, Button, Checkbox, Alert, CircularProgress } from '@mui/material/';
import { DriveFolderUpload } from '@mui/icons-material/';
import { useForm } from "react-hook-form";
import { addOne } from "../CRUDProcess/addOne"
import { uploadToFirebase, deleteData } from "../firebase"
const userInput = [
    {
        id: 1,
        label: "Username",
        placeholder: "john_doe",
        var: "username",
        type: "text"
    },
    {
        id: 2,
        label: "Email",
        placeholder: "john_doe@gmail.com",
        var: "email",
        type: "email"
    },
    {
        id: 3,
        label: "Phone",
        placeholder: "+1 234 567 89",
        var: "numberPhone",
        type: "number"
    },
    {
        id: 4,
        label: "Password",
        placeholder: "",
        var: "password",
        type: "password",
        rule: {
          pattern: {
            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
            message: "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long."
          }
        }
    },
    {
        id: 5,
        label: "Address",
        placeholder: "Elton St.216 NewYork",
        var: "address",
        type: "text"
    },
    {
        id: 6,
        label: "Country",
        placeholder: "USA",
        var: "country",
        type: "text"
    }
  ]

const New = () => {
  const [ upload, setUpload ] = useState({avatar: "https://app.dr-psy.com/template/default-avatar.jpg"})
  const { register, handleSubmit, reset, formState: { errors }, setError } = useForm();
  const [ open, setOpen ] = useState({
    "avatar": false
  })
  const { message, loading } = useSelector( state => state.usersReducer )
  
  useEffect(()=>{
    const handleAlert = (e) => {
      e.preventDefault();
      return e.returnValue = "Yes"
    } 

    window.addEventListener("beforeunload", handleAlert)
    return ()=>{
    window.removeEventListener("beforeunload", handleAlert)

    }
  },[])

  useEffect(()=>{
    if(message.error?.code === 11000){
      const key = Object.keys(message.error.keyPattern)[0]
        setError(key, {message: "This field is existing!"})
    }
  },[message.error])

  const onSubmit = async data => {

    await addOne('user', {...data, ...upload}) 
    
    reset({
      username: "",
      email: "",
      numberPhone: null,
      password: "",
      address: "",
      country: "",
      avatar: "",
    })

    setUpload({avatar: "https://app.dr-psy.com/template/default-avatar.jpg"})
  };

  

  const handleUploadImg = (file)=>{
    try{
      setOpen(prev => ({...prev, "avatar": true}))
      if(upload.avatar !== "https://app.dr-psy.com/template/default-avatar.jpg"){
        deleteData(upload.avatar)
      }

      uploadToFirebase({file: file, label: "avatar"}, setUpload, setOpen)
 
    }catch(err){
      throw err
    }
  }

  return (
        <>
      
        <div className="new-top">
          <h1>Add New User</h1>
        </div>

        <div className="new-bottom">
          <div className="new-left">
            <div className="new-avatar">

              {
                open.avatar?
                <div style={{display: "flex", justifyContent: "center"}}>
                  <CircularProgress />
                </div>
                :
                <img src={upload.avatar} alt="" />
              } 

              <div className="new-upload-image" style={!open.avatar ? {} : {visibility: "hidden"}}>

                <InputLabel htmlFor='file' sx={{ fontSize:"1.6rem"}} className="new-upload-label">Upload Avatar
                <DriveFolderUpload className='new-upload-icon'/>
                </InputLabel>
                <input type="file" id="file"  style={{ display:"none"}} accept = ".jpg, .jpeg, .png"
                 {...register("avatar", {
                  onChange: v => handleUploadImg(v.target.files[0])
                })}
                />
              </div>


            </div>
           
          </div>
          <div className="new-right">
            <Box 
            component="form"
            sx= {
              {
                display: "flex",
                flexWrap: "wrap",
                gap:"20px",
                justifyContent:"space-around"
              }
            }
            onSubmit={handleSubmit(onSubmit)}
            >
              
              {userInput.map(item=>(
                <div className="new-form-item" key={item.var}>
                  <InputLabel htmlFor= {`new-form-${item.type}-${item.id}`} sx={{ fontSize:"1.6rem"}} className="new-form-label">{item.label}</InputLabel>
                  <Input placeholder={item.placeholder} sx={{ fontSize:"1.6rem", width: "100%"}} {...register(`${item.var}`, { required: "Above Field is required", pattern: item?.rule?.pattern})} type={item.type} id={`new-form-${item.type}-${item.id}`} className="new-form-input"/>
                  <p style={{color: "red", margin: 0}}>{errors[item.var]?.message}</p>
                </div>
              ))}


                <div className="new-form-checkbox">
                  <InputLabel htmlFor= {`new-form-isAdmin`} sx={{ fontSize:"1.6rem"}} className="new-form-label">Is Admin</InputLabel>
                  <Checkbox {...{ inputProps: { 'aria-label': 'Checkbox demo' } }} sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} {...register(`isAdmin`)}/>
                </div>

              <div className="new-form-item">
                  
                    <Button variant="contained" type='submit' className='new-form-button'>
                    Add New
                    </Button>                
                
              </div>
                <Box sx={{ display: 'flex', justifyContent: "center" }}>
                    {
                      loading && <CircularProgress />
                    }

                    {
                       message.status && <Alert severity= {message.status} style={{visibility: message.status}}>Add user completed!!!</Alert> 
                    } 
                    
                </Box>
            </Box>
          </div>
        </div>
        </>
  )
}

export default New