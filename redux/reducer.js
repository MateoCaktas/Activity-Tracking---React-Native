import userActivities from "../activities.json";
import { 
    GET_ACTIVITIES,
    ADD_ACTIVITY,
    LOGIN_USER,
    GET_USER_INFO,
    LOGOUT_USER,
    REGISTER_USER,
    EDIT_USER
} from "./types";
import RegisteredUsers from "../registered-users.json";

const initialState = {
    userProfile: null,
    registeredUsers: RegisteredUsers,
    userActivities,
    loggedIn: false
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
        case LOGIN_USER:
            let currentUser = {};
            let currentLoginValue = false;
            const { email , password } = payload;
            state.registeredUsers.forEach(user => {
                if(user.email === email && user.password === password){
                    currentUser = user;
                    currentLoginValue = true;
                } 
            });
            return {
                ...state,
                userProfile: currentUser,
                loggedIn: currentLoginValue
            }
        case LOGOUT_USER:
            return {
                ...state,
                loggedIn: false
            }
        case GET_USER_INFO:
            return {
                ...state,
                userProfile
            }
        case REGISTER_USER:
            const AddedUser = {
                email: payload.email, 
                userName: payload.userName,
                password: payload.password,
                capturedPhoto:null,
                defaultImage:true
            }
            return {
                ...state,
                registeredUsers: [...state.registeredUsers, AddedUser]
            }
        case EDIT_USER:
            const editedUser = payload;
            console.log('INSIDE EDIT USER REDUCER')
            console.log(editedUser);
            let index = state.registeredUsers.findIndex(user => user.email === editedUser.email);
            return {
                ...state,
                registeredUsers: state.registeredUsers.splice(index, 0, editedUser),
                userProfile: editedUser
            }
        default:
            return state
    }
}