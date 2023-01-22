export const ON_DARKMODE= "On"
export const OFF_DARKMODE= "Off"
export const INITIAL_STATE= ""

export const reducer= (state, action)=>{
    switch(action){
        case "On":
            return "dark"
        case "Off":
            return ""
        default:
            return state
    }
}