import axios from "axios"
import {fetchLogout} from "../loginProcess/fetchLogout"

const axiosRefresh = axios.create({
    baseURL: process.env.REACT_APP_API_baseURL,
    headers: {'Content-type': 'application/json'},
    timeout: 2500,
    withCredentials: true
})

axiosRefresh.interceptors.request.use(config=>{
    return config

}, err=>{
    throw err
})

axiosRefresh.interceptors.response.use(res=>{

    return res.data
}, async err=>{

    if(err.response.status=== 401 || err.response.status === 403){
        await fetchLogout()
    }
    throw err
})

export default axiosRefresh;