import globalStore from "../Redux/globalStore";
import databaseApi from "../callApi/databaseApi"

export const IMAGE_BACKGROUND = "img" ;
export const IMAGE_TITLE = "imgTitle" ;
export const IMAGE_POSTER = "imgSm" ;
export const VIDEO = "video";
export const TRAILER = "trailer";

export const addOne = async (type, data) =>{
    globalStore.dispatch(
        {
            type:`ADD-${type.toUpperCase()}-FETCHING`
        }
    )
    
    try{
        await databaseApi.addOne(type, data)
        globalStore.dispatch(
            {
                type:`ADD-${type.toUpperCase()}-COMPLETED`,
            }
        )
    }catch (err){
        
        globalStore.dispatch(
            {
                type:`ADD-${type.toUpperCase()}-FAILED`,
                payload: err.response.data
            }
        )
        throw err
    }
}