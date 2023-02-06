import React, { useEffect, useState } from 'react'
import "../scss/new.scss"
import { Input, Box, InputLabel, Button, Checkbox, CircularProgress, Alert } from '@mui/material/';
import { DriveFolderUpload } from '@mui/icons-material/';
import { useForm } from "react-hook-form";
import { addOne } from "../CRUDProcess/addOne"
import { deleteData, uploadToFirebase } from "../firebase"
import { useSelector } from 'react-redux';

const movieInput = [
    {
        id: 1,
        label: "Title",
        placeholder: "",
        var: "title",
        type: "text"
    },
    {
        id:2,
        label: "Description",
        var: "description",
        type: "text"
    },
    {
        id: 3,
        label: "Year",
        placeholder: "",
        var: "year",
        type: "number"
    },
    {
        id: 4,
        label: "Limit",
        placeholder: "ex: 18+",
        var: "limit",
        type: "number"
    },
    {
        id: 5,
        label: "Genre",
        placeholder: "",
        var: "genre",
        type: "text"
    },
    {
        id: 6,
        label: "Duration",
        placeholder: "ex: 1h24m",
        var: "time",
        type: "text"
    },
    {
        id: 7,
        label: "Brief Description",
        placeholder: "",
        var: "briefDes",
        type: "text"
    },

  ]
const NewMovie = () => {
    const IMAGE_BACKGROUND = "img" ;
    const IMAGE_TITLE = "imgTitle" ;
    const IMAGE_POSTER = "imgSm" ;
    const VIDEO = "video";
    const TRAILER = "trailer";
    const [open, setOpen] = useState({
      [IMAGE_BACKGROUND]: false,
      [IMAGE_TITLE]: false,
      [IMAGE_POSTER]: false,
      [VIDEO]: false,
      [TRAILER]: false,
    })
   
    const { message, loading} = useSelector( state => state.moviesReducer)
    const { register, handleSubmit, setError, formState: { errors }, reset } = useForm();
    const [upload, setUpload] = useState({})
 
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

    useEffect(() => {
      if(message.error?.code === 11000){
        const key = Object.keys(message.error.keyPattern)[0]
        setError(key, {message: "This field is existing!"})
      }

    }, [message.error])
    
    const onSubmit = async data => {
      await addOne("movie",{
      ...data,
      ...upload
      })

      reset({
        title: "",
        description: "",
        year: null,
        limit: null,
        genre: "",
        time: "",
        briefDes: "",
        img: "",
        imgTitle: "",
        imgSm: "",
        video: "",
        trailer: ""
      })
      setUpload({})
    }
    
    const uploadFile = (label, file) =>{
      try{
        setOpen( prev => 
          ({...prev, [label]: true})
          )
        if(upload[label]){
          deleteData(upload[label])
        }
        uploadToFirebase({file: file, label}, setUpload, setOpen)
      }
      catch(err){
        throw err
      }
      
    }

  return (

      <>
      <div className="new-top">
        <h1>Add New Movie</h1>
      </div>

      <div className="new-bottom">
        <div className="new-left">
            <div className="new-movie">
              {
                open[IMAGE_BACKGROUND] ?
                <div className="icon-loading">
                  <CircularProgress/>
                </div>
                :
                <img src={upload[IMAGE_BACKGROUND] || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"} alt="" />
              }

              <div className="new-upload-image" style={!open[IMAGE_BACKGROUND] ? {} : {visibility: "hidden"}}>
                  <InputLabel htmlFor='imgBackground' sx={{ fontSize:"1.6rem"}} className="new-upload-label">Upload Image Background
                  <DriveFolderUpload className='new-upload-icon'/>
                  </InputLabel>
                  <input type="file" id="imgBackground"  style={{ display:"none"}} accept=".jpg, .jpeg, .png"
                  {...register(IMAGE_BACKGROUND, {
                    required: "Don't be blank!",
                    onChange: e => uploadFile(IMAGE_BACKGROUND, e.target.files[0])

                  })}
                  />
                  <p >{ errors[IMAGE_BACKGROUND]?.message }</p>
              </div>


            </div>

            <div className="new-movie">
              {
                open[IMAGE_TITLE] ?
                <div className="icon-loading">
                  <CircularProgress/>
                </div>
                :
                <img src={upload[IMAGE_TITLE] || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"} alt="" />
              }
                    <div className="new-upload-image" style={!open[IMAGE_TITLE] ? {} : {visibility: "hidden"}}>
                          <InputLabel htmlFor='imgTitle' sx={{ fontSize:"1.6rem"}} className="new-upload-label">Upload Image Title
                          <DriveFolderUpload className='new-upload-icon'/>
                          </InputLabel>
                        <input type="file" id="imgTitle"  style={{ display:"none"}} accept=".jpg, .jpeg, .png"
                        {...register(IMAGE_TITLE, {
                          required: "Don't be blank!",
                          onChange: e => uploadFile(IMAGE_TITLE, e.target.files[0])
                        })}
                        />
                        <p >{ errors[IMAGE_TITLE]?.message }</p>
                    </div>

            </div>

            <div className="new-movie">
              {
                open[IMAGE_POSTER] ?
                <div className="icon-loading">
                  <CircularProgress/>
                </div>
                :
                <img src={upload[IMAGE_POSTER] || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"} alt="" />
              }
               
                <div className="new-upload-image" style={!open[IMAGE_POSTER] ? {} : {visibility: "hidden"}}>
                      <InputLabel htmlFor='imgPoster' sx={{ fontSize:"1.6rem"}} className="new-upload-label">Upload Image Poster
                      <DriveFolderUpload className='new-upload-icon'/>
                      </InputLabel>
                    <input type="file" id="imgPoster"  style={{ display:"none"}} accept=".jpg, .jpeg, .png"
                    {...register(IMAGE_POSTER, {
                      required: "Don't be blank!",
                      onChange: e => uploadFile(IMAGE_POSTER, e.target.files[0])
                    })}
                    />
                    <p >{ errors[IMAGE_POSTER]?.message }</p>
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
            
            { movieInput.map(item => (
              <div className="new-form-item" key={item.id}>
                <InputLabel htmlFor= {`new-form-${item.type}-${item.id}`} sx={{ fontSize:"1.6rem"}} className="new-form-label">{item.label}</InputLabel>
                <Input placeholder={item.placeholder} sx={{ fontSize:"1.6rem", width: "100%"}} 
                {...register(`${item.var}`, {
                  required: "Don't be blank!"
                })} 
                type={item.type} 
                id={`new-form-${item.type}-${item.id}`} 
                className="new-form-input"/>
                <p style={{color: "red", margin: 0}}>{ errors[item.var.toLowerCase()]?.message }</p>
              </div>
            ))}

              <div className="new-form-checkbox">
                <InputLabel htmlFor= {`new-form-checkbox`} sx={{ fontSize:"1.6rem"}} className="new-form-label">Is Series</InputLabel>
                <Checkbox {...{ inputProps: { 'aria-label': 'Checkbox demo' } }} sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} {...register(`isSeries`)}/>
                <p >{ errors[`isSeries`]?.message }</p>
              </div>
              
              <div className="new-movie">
              {
                open[TRAILER] &&
                <div className="icon-loading">
                  <CircularProgress/>
                </div>
              }
                {upload[TRAILER] && <video src={upload[TRAILER]} alt="" controls/>}
                <div className="new-upload-image" style={!open[TRAILER] ? {} : {visibility: "hidden"}}>
                    <InputLabel htmlFor='trailer' sx={{ fontSize:"1.6rem"}} className="new-upload-label">Upload Image Trailer
                    <DriveFolderUpload className='new-upload-icon'/>
                    </InputLabel>
                    
                    <input type="file" id="trailer"  style={{ display:"none"}} accept="video/*"
                    {...register(TRAILER, {
                      required: "Don't be blank!",
                      onChange: e => uploadFile(TRAILER, e.target.files[0])
                    })}
                    />
                    <p>{ errors[TRAILER]?.message }</p>
                </div>
            </div>

            <div className="new-movie">
              {
                open[VIDEO] &&
                <div className="icon-loading">
                  <CircularProgress/>
                </div>
              }
                {upload[VIDEO] && <video src = {upload[VIDEO]} alt="" controls/>}
                <div className="new-upload-image" style={!open[VIDEO] ? {} : {visibility: "hidden"}}>
                    <InputLabel htmlFor='video' sx={{ fontSize:"1.6rem"}} className="new-upload-label">Upload Image Video
                    <DriveFolderUpload className='new-upload-icon'/>
                    </InputLabel>
                    <input type="file" id="video"  style={{ display:"none"}} accept="video/*"
                    {...register(VIDEO, {
                      required: "Don't be blank!",
                      onChange: e => uploadFile(VIDEO, e.target.files[0])
                    })}
                    />
                    <p >{ errors[VIDEO]?.message }</p>
                </div>
            </div>

            <div className="new-form-item">
                
                <Button variant="contained" type='submit' className='new-form-button'>
                Add New
                </Button>
                  
                <Box sx={{ display: 'flex', alignItems: "center", flexDirection: "column", marginTop: "10px" }}>
                {(loading ) && <CircularProgress/>}

                {
                  message.status === "failed" &&
                  (<Alert severity = "error" > Add movie failed!!!</Alert>)
                }
                {
                  message.status === "success" &&
                  <Alert severity = "success" >Add movie completed!!!</Alert> 
                }

               </Box>
            </div>
          </Box>
        </div>
      </div>
      </>
  )
}

export default NewMovie