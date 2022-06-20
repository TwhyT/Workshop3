import axios from "axios"
import { errorFetch } from "./statusAction"

export const List_Cart = 'List_Cart'
export const Delete_To_Cart = 'Delete_To_Cart'
export const Add_Cart = 'Add_Cart'
export const Edit_Cart = 'Edit_Cart'
export const SET_CART = 'SET_CART'
export const CHECK_OUT = 'CHECK_OUT'

export function ListCart(ListCart) {
    const token = localStorage.getItem('token')
    const config = { headers: {Authorization: `Bearer ${token}`}};
    axios.get('http://127.0.0.1:8000/cart/', config)
            .then((cart) => {
                cart = cart.data
                console.log("CART",cart);
            })
    return{
        type: List_Cart,
        payload: ListCart
    }
}

export function deleteCart(deleteCart){
    const token = localStorage.getItem('token')
    var carts = []
    console.log("Del",deleteCart);
    const config = { headers: {Authorization: `Bearer ${token}`} };
    axios.delete(`http://127.0.0.1:8000/cart/${deleteCart}`, config)
    axios.get('http://127.0.0.1:8000/cart/', config)
            .then((cart) => {
                carts = cart.data
                console.log("CART",cart);
            })
    return{
        type: Delete_To_Cart,
        payload: carts
    }
}

export function addCart(product,quantity){
    const token = localStorage.getItem('token')
    var carts = []
    const config = { headers: {Authorization: `Bearer ${token}`}};
    const DATA = {product:product,quantity:quantity}
    console.log("MYSEND",DATA);
    axios.post(`http://127.0.0.1:8000/cart/`, DATA,config,)
    axios.get('http://127.0.0.1:8000/cart/', config)
            .then((cart) => {
                carts = cart.data
                console.log("CART",carts);
            })
    console.log("CART2",carts);
    return{
        type: Add_Cart,
        payload: carts
    }
}

export function EditCart(cartID,quantity){
    const token = localStorage.getItem('token')
    var carts = []
    const config = { headers: {Authorization: `Bearer ${token}`}};
    const DATA = {quantity:quantity}
    console.log("MYSEND",DATA);
    axios.put(`http://127.0.0.1:8000/cart/${cartID}/`, DATA,config,)
    axios.get('http://127.0.0.1:8000/cart/', config)
            .then((cart) => {
                carts = cart.data
                console.log("CART",cart);
            })
    return{
        type: Edit_Cart,
        payload: carts
    }
}

export function setCarts(carts) {
    return {
        type: SET_CART,
        payload: carts,
    }
}

export function fetchCartAsync(product,quantity){

    return async function(dispatch){
            const token = localStorage.getItem('token')
            var carts = []
            const config = { headers: {Authorization: `Bearer ${token}`}};
            const DATA = {product:product,quantity:quantity}
            console.log("MYSEND",DATA);
            axios.post(`http://127.0.0.1:8000/cart/`, DATA,config,)
            axios.get('http://127.0.0.1:8000/cart/', config)
            .then((cart) => {
                carts = cart.data
                console.log("CART",carts);
                dispatch(setCarts(carts))
                return true
            })

            .catch((error) => {
                // if(error.response)
                // {
                console.log("error",error.response?.data||error);
                // dispatch(errorFetch(error.response.data))
                // return false
                // }
            });

        }
}

export function Checkout(token){
    // const token = localStorage.getItem('token')
    const data = {}
    var carts = []
    const config = { headers: {Authorization: `Bearer ${token}`}};
    axios.post('http://127.0.0.1:8000/checkout/', data, config)
    axios.get('http://127.0.0.1:8000/cart/', config)
            .then((cart) => {
                carts = cart.data
                console.log("CART",cart);
            })
    return{
        type: CHECK_OUT,
        payload: carts
    }
}