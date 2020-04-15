import { combineReducers } from "redux";
import { authReducer  } from "./authReducer";
// import { newStreamReducer } from "./newStreamCreatedReducer";
import { streamsListReducer } from "./streamsListReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamsListReducer
});