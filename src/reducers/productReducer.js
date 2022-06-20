import { Detail_Product } from "../actions/productAction";

const initialstate = {
    product : null,
}

export function detailproductReducer(state = initialstate, action){
    switch (action.type) {
        case Detail_Product:
            return {
                product : action.payload
            }
        default:
            return state
    }
}