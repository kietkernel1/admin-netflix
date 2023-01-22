

const INITIAL_STATE= {
    user: JSON.parse(localStorage.getItem("user")) || null,
}
 const loginReducer= (state= INITIAL_STATE, action)=>{
    switch (action.type){
        case "LOG_IN":{
            const {accessToken, ...user}= action.payload;
            localStorage.setItem("token", `Bearer ${accessToken}`)
            localStorage.setItem("user", JSON.stringify(user))
            return {user};
        }
        case "LOG_OUT":
            localStorage.clear()
            return {user:null}
        default:
            return state
    }
}   
export default loginReducer



