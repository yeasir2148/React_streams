let initialState = {
        isSignedIn: null,
        googleUser: null
}

export const authUserReducer = (state = initialState, action) => {
    if(['AUTH_STATUS_CHANGED'].includes(action.type)) {
        return { ...state, ...action.payload };
    }

    return state;

}