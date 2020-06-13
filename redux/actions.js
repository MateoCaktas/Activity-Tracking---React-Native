import store from "./store";
import { ADD_ACTIVITY } from "./types";

export const addActivity = (Activity) => {
    store.dispatch({
        type:ADD_ACTIVITY,
        payload:Activity
    })
}