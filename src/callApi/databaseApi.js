import axiosClient from "./axiosClient";

const databaseApi ={
    getNew(type){
        const url= `/${type}?new=true`
        return axiosClient.get(url)
    },

    getAll(type){
        const url= `/${type}`
        return axiosClient.get(url)
    },

    deleteOne(id, type){
        const url= `${type}s/delete/${id}`
        return axiosClient.delete(url)
    },

    addOne(type, data){
        
        const url = type === "movie" ? `movies/upload`: `auth/register`
        return axiosClient.post(url, data)
    },

    getOne(id, type){
        const url = `/${type}/find/${id}`
        return axiosClient.get(url)
    },


}

export default databaseApi;