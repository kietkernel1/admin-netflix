import axiosRefresh from "../callApi/axiosRefresh";
const refreshProcess = () =>{
    let isRequest= null;
    
    const fetchRefresh= async()=>{
        isRequest= isRequest? isRequest: axiosRefresh("/auth/refreshToken")
        const {accessToken} = await isRequest
        return accessToken
    }
    return fetchRefresh;
}
const requestNewToken = refreshProcess();
export default requestNewToken;