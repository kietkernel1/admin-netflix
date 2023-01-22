import axiosClient from "./axiosClient";

const usersApi= {

    getStat(){
        const url= "/users/stats"
        return axiosClient.get(url)
    }

}

export default usersApi