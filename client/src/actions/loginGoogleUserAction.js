export const loginGoogleUser = () => {
    return (dispatch, getState) => {
        let googleAuthInstance = (getState().auth && getState().auth.gAuthInstance) || null;
        if(googleAuthInstance) {
            googleAuthInstance.signIn()
            .then( () => {
                dispatch({
                    type: 'AUTH_STATUS_CHANGED',
                    payload: {
                        isSignedIn: googleAuthInstance.isSignedIn.get(),
                        googleUser: googleAuthInstance.currentUser.get()
                    } 
                });
            });        
        }
    }
}