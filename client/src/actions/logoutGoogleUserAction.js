export const logoutGoogleUser = () => {
    return async (dispatch, getState) => {
        let googleAuthInstance = getState().auth.gAuthInstance;
        await googleAuthInstance.signOut();
        dispatch({
            type: 'AUTH_STATUS_CHANGED',
            payload: {
                isSignedIn: googleAuthInstance.isSignedIn.get(),
                googleUser: googleAuthInstance.currentUser.get()
            }
        });
    }
}