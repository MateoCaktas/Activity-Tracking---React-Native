import userActivities from "../activities.json";
import { GET_ACTIVITIES, ADD_ACTIVITY } from "./types";

const initialState = {
    userProfile: null,
    userActivities
};

export default function reducer(state = initialState, action){
    const { payload } = action;
    switch(action.type){
        case GET_ACTIVITIES:
            return{
                ...state
            }
        case ADD_ACTIVITY:
            let newActivity = {};
            newActivity = payload;            
            return{
                ...state,
                userActivities:[newActivity, ...state.userActivities]
            }
        default:
            return state
    }
}