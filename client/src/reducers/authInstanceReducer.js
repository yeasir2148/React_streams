export const authInstanceReducer = (state = null, action) => {
    if(action.type === 'GAUTH_INSTANCE') {
        return action.payload ;
    }

    return state;
}