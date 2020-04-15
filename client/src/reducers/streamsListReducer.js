import { newStreamReducer } from "./newStreamCreatedReducer";
import editStreamReducer from "./editStreamReducer";
import _ from "lodash";

let initialState = {};

export const streamsListReducer = (state = initialState, action) => {
    if(action.type === 'GET_STREAMS') {
        return action.payload;
    } else if(action.type === 'CREATE_STREAM') {
        return {...state, ...action.payload };
    } else if(action.type === 'EDIT_STREAM') {
        return {...state, [action.payload.id]: action.payload };
    } else if(action.type === 'DELETE_STREAM') {
        return _.omit(state, action.payload);
    }

    return state;
}