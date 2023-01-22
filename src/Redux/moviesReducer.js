

const INITIAL_STATE= {
    movies: [],
    loading: false,
    message: {
        error: null,
        status: null
    }
}

export const moviesReducer= (state= INITIAL_STATE, action)=>{
    switch (action.type){
        case "GET-MOVIES": {
            return {
                ...state,
                movies: action.payload}
        }

        case "DELETE-MOVIE-FETCHING": {
            return { 
                ...state,
                loading: true,
                message: {
                    error: null,
                    status: null
                }
            }
        }

        case "DELETE-MOVIE-COMPLETED": {
            
            const newMovies = state.movies.filter( item => item['_id'] !== action.payload )

            return { 
                ...state,
                movies: newMovies,
                loading: false,
                message: {
                    error: null,
                    status: "Delete movie successful!!!"
                }
            }
        }

        case "DELETE-MOVIE-FAILED": {
            return { 
                ...state,
                loading: false,
                message: {
                    error: null,
                    status: "Delete movie failed!!!"
                }
            }
        }

        case "ADDING-MOVIE": {
            return {
                ...state,
                loading: true,
                message: {
                    error: null,
                    status: null
                }
            }
        }

        case "ADD-MOVIE-COMPLETED": {
            return {
                ...state,
                loading: false,
                message: {
                    status: "success",
                    error: null
                }
            }
        }

        case "ADD-MOVIE-FAILED": {
            return {
                ...state,
                loading: false,
                message: {
                    status: "failed",
                    error: action.payload
                }
            }
        }

        default: 
            return state

    }
 
}
export default moviesReducer