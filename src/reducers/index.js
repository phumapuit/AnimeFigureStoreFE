import { combineReducers } from "redux";
// import authReducer from "./AuthReducer";
// import movieReducer from "./MovieReducer";
import userReducer from "./UserReducer";
import categoryReducer  from "./CategoryReducer";
import productReducer from "./ProductReducer";

const rootReducer = combineReducers({
    users:userReducer,
    products: productReducer
    //     userReducer
});
export default rootReducer;