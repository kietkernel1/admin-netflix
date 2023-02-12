import databaseApi from "../callApi/databaseApi"
import globalStore from "../Redux/globalStore"

const fetchAllMovies= async (type)=>{
    try{
        const res= await databaseApi.getAll(type);
        
        globalStore.dispatch({
            type:`GET-${type.toUpperCase()}`,
            payload: res
        })  
        
    }catch (err){
        throw err
    }
}

export default fetchAllMovies