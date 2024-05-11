import { combineReducers } from "redux";
// import authReducer from "./AuthReducer";
// import movieReducer from "./MovieReducer";
import userReducer from "./UserReducer";
import categoryReducer  from "./CategoryReducer";
const rootReducer = combineReducers({
    // authReducer, movieReducer, userReducer, theaterReducer,
    userReducer, categoryReducer
});
export default rootReducer;