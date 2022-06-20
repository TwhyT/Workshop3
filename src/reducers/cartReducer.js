import { List_Cart, Delete_To_Cart, Edit_Cart, SET_CART, CHECK_OUT } from "../actions/cartAction"

const initiastate = {
    cart: [],
}

export function cartReducer(state = initiastate, action){
    switch (action.type) {
        case List_Cart:
            return{
                ...state,
                cart: action.payload
            }

        case Delete_To_Cart:
            return{
                ...state,
                cart: action.payload
            }

        case SET_CART:
            console.log("CART_REDUC",action.payload);
            return{
                ...state,
                cart: action.payload

            }
        
        case Edit_Cart:
            return{
                ...state,
                cart: action.payload
            }

        case CHECK_OUT:
            return{
                ...state,
                cart: action.payload
            }

        default:
            return state
    }
}