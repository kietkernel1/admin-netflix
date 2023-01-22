import { authApi } from "../callApi/authApi"
import globalStore from '../Redux/globalStore';
export const fetchLogout= async ()=>{
    
    try{ 
        await authApi.logout();
        globalStore.dispatch({type:"LOG_OUT"})
    }catch(err){
        
        throw(err)
    }
}