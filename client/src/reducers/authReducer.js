import { authUserReducer } from "./authUserReducer";
import { authInstanceReducer } from "./authInstanceReducer";

let initialState = {
    user: { 
        isSignedIn: null,
        googleUser: null
    },
    gAuthInstance: null
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'AUTH_STATUS_CHANGED':
            return {...state, user: authUserReducer(state.user, action) }
            // break;
        case 'GAUTH_INSTANCE':
            return {...state, gAuthInstance: authInstanceReducer(state.gAuthInstance, action)}
            // break;
        default:
            return state;
    }
}