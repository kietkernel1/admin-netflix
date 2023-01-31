import globalStore from '../Redux/globalStore';
import { authApi } from "../callApi/authApi"

export const fetchLogin = async (data) =>{
    try{
        const res = await authApi.login(data)
        globalStore.dispatch({type: "LOG_IN", payload: res})
    }catch(err){
        // globalStore.dispatch({type: "LOG_IN_FAILED", payload: err.response.data})
        console.log(err)
    }
}