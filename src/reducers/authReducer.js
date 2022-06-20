import { SET_AUTH } from "../actions/authAction";

const initialstate = {
    user: null,
    token: localStorage.getItem('token'),
}

export function authReducer(state = initialstate, action){
    switch (action.type) {
        case SET_AUTH:
            console.log("paylaod",action.payload);
            if (action.payload){
                console.log("PrevActionPay",action.payload.access);
                localStorage.setItem('token',action.payload.access)
                const expire_in = action.payload.expire_in
                const CurrentTime = Date.now()/1000
                const time = CurrentTime + expire_in
                localStorage.setItem('expire_in',time)
            }
            return {
                user: action.payload,
            }
    
        default:
            return state
    }
}