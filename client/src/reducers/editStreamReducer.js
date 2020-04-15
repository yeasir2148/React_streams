let initialState = {};
export default (state = initialState, action) => {
    if(action.type === 'EDIT_STREAM') {
        return action.payload;
    }

    return state;
}