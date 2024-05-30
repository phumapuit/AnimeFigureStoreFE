import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import categoryReducer  from "./CategoryReducer";
import productReducer from "./ProductReducer";

const rootReducer = combineReducers({
    users:userReducer,
    products: productReducer,
    categoryReducer: categoryReducer,
    //     userReducer
});
export default rootReducer;