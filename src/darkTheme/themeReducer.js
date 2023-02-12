export const ON_DARKMODE = "On"
export const OFF_DARKMODE = "Off"
export const INITIAL_STATE = ""

export const reducer = (state = INITIAL_STATE, action) => {
    switch(action){
        case ON_DARKMODE:
            return "dark"
        case OFF_DARKMODE:
            return INITIAL_STATE
        default:
            return state
    }
}