

const INITIAL_STATE = {
    loading: false,
    users: [],
    message: {
        error: null,
        status: null
    }
}

export const usersReducer= (state = INITIAL_STATE, action) => {
    switch (action.type){
        case "GET-USERS": {
            return {
                ...state,
                users: action.payload
            }
        }

        case "DELETE-USER-FETCHING": {
            return { 
                ...state,
                loading: true,
                message: {
                    error: null,
                    status: null
                }
            }
        }

        case "DELETE-USER-COMPLETED": {
            
            const newUsers = state.users.filter( item => item['_id'] !== action.payload )

            return { 
                ...state,
                users: newUsers,
                loading: false,
                message: {
                    error: null,
                    status: null
                }
            }
        }

        case "DELETE-USER-FAILED": {
            return { 
                ...state,
                loading: false,
                message: {
                    error: action.payload,
                    status: null
                }
            }
        }

        case "ADD-USER-FETCHING": {
            return {
                ...state,
                loading: true,
                message: {
                    error: null,
                    status: null
                }
            }
        }

        case "ADD-USER-COMPLETED": {
            return {
                ...state,
                loading: false,
                message: {
                    error: null,
                    status: "success"
                }
            }
        }

        case "ADD-USER-FAILED" : {
            return {
                ...state,
                loading: false,
                message: {
                    error: action.payload,
                    status: "error"
                }
            }
        }
        case "RESET-MESSAGE": {
            return{
                ...state,
                message: {
                    error: null,
                    status: null
                }
            }
        }
        default: 
            return state

    }
 
}
export default usersReducer