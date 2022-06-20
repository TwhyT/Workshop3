import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { statusReducer } from "./statusReducer";
import { categoryReducer } from "./categoryReducer";
import { detailproductReducer } from "./productReducer";

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    status: statusReducer,
    category: categoryReducer,
    product: detailproductReducer
})

export default rootReducer