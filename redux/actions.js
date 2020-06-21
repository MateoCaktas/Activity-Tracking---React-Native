import store from "./store";
import { ADD_ACTIVITY, LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "./types";

export const addActivity = (Activity) => {
    store.dispatch({
        type:ADD_ACTIVITY,
        payload:Activity
    })
}

export const loginUser = (email, password) => {
    const UserCredentials = {email, password}
    store.dispatch({
        type:LOGIN_USER,
        payload: UserCredentials
    })
}

export const logout = () => {
    store.dispatch({
        type:LOGOUT_USER
    })
}
export const registerUser = (email, userName, password) => {
    const UserCredentials = { email, userName, password };
    store.dispatch({
        type:REGISTER_USER,
        payload: UserCredentials
    })
}