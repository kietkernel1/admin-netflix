import axios from "axios"
import jwt_decode from "jwt-decode"
import requestNewToken from "../loginProcess/refreshProcess"

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_baseURL,
    headers: {'Content-type': 'application/json'},
    timeout: 2500
})

axiosClient.interceptors.request.use( async(config) => {
    if(config.url=== "/auth/login"||config.url==="/auth/logout"){
        return config
    }
    let token = localStorage.getItem("token");

    const currentTime= new Date()
    const decodedToken= jwt_decode(token.split(" ")[1])

    if(decodedToken.exp < currentTime.getTime()/1000){
        const newToken= await requestNewToken()
        token= `Bearer ${newToken}`
    }

    localStorage.setItem("token", token)
    config.headers.token= token;
    return config
}, error=>{

     throw error
})

axiosClient.interceptors.response.use( res=>{
    
    return res.data
}, async error=>{
    
    throw error
})

export default axiosClient