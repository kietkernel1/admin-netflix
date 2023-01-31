

const INITIAL_STATE= {
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null
}
 const loginReducer= (state= INITIAL_STATE, action)=>{
    switch (action.type){
        case "LOG_IN":{
            const {accessToken, ...user}= action.payload;
            localStorage.setItem("token", `Bearer ${accessToken}`)
            localStorage.setItem("user", JSON.stringify(user))
            return {
                ...state,
                user
            };
        }

        case "LOG_IN_FAILED": {
            return {
                ...state,
                error: action.payload
            }
        }

        case "LOG_OUT":
            localStorage.clear()
            return {
                error: null,
                user: null
            }

        default:
            return state
    }
}   
export default loginReducer



