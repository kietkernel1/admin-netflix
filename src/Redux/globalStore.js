import {legacy_createStore, combineReducers} from "redux"
import loginReducer from "./loginReducer"
import moviesReducer from "./moviesReducer"
import usersReducer from "./usersReducer";

const reducers= combineReducers({loginReducer, moviesReducer, usersReducer});
const globalStore= legacy_createStore(reducers);
export default globalStore