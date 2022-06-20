import { startFetch, endFetch, errorFetch } from "./statusAction"
import Singin from "../page/Singin"
import { useEffect } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"

export const SET_AUTH = 'SET_AUTH'

export function setAuth(user) {
    console.log("setauth",user);
    return {
        type: SET_AUTH,
        payload: user,
    }
}

export function fetchAuthAsync(username, password){

    return async function(dispatch){
            dispatch(startFetch())
            
            axios.post('http://127.0.0.1:8000/token/', {
            username: username,
            password: password,
            })

            .then((response) => {
                console.log("User",response);
                dispatch(setAuth(response.data))
                dispatch(errorFetch(''))
                dispatch(endFetch())
                return true
            })

            .catch((error) => {
                if(error.response)
                {
                console.log("error",error.response.data);
                dispatch(setAuth(null))
                dispatch(errorFetch(error.response.data))
                dispatch(endFetch())
                return false
                }
            });

        }
}