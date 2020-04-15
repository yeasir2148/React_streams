let initialState = {};

export const newStreamReducer = (state = initialState, action) => {
    if(action.type === 'CREATE_STREAM') {
        return action.payload;
    }

    return state;
}