import databaseApi from "../callApi/databaseApi"
import globalStore from "../Redux/globalStore"

const deleteOne= async (id, type)=>{
    globalStore.dispatch({
        type:`DELETE-${type.toUpperCase()}-FETCHING`,
        payload: id
    })  

    try{
        await databaseApi.deleteOne(id, type)
        globalStore.dispatch({
            type:`DELETE-${type.toUpperCase()}-COMPLETED`,
            payload: id
        })  

    }catch (err){
        globalStore.dispatch({
            type:`DELETE-${type.toUpperCase()}-FAILED`,
            payload: err.response.data
        })  
        
    }

}

export default deleteOne