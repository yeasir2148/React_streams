export const initiateGauthInstance = () => {
    return (dispatch, getState) => {
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId: '940303609245-vueghaar69hl8bhgll68jcs356npcjfg.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                dispatch({
                    type: 'GAUTH_INSTANCE',
                    payload: window.gapi.auth2.getAuthInstance()
                });
                dispatch({
                    type: 'AUTH_STATUS_CHANGED',
                    payload: {
                        isSignedIn: getState().auth.gAuthInstance.isSignedIn.get(),
                        googleUser: window.gapi.auth2.getAuthInstance().currentUser.get()
                    }
                });
            }, () => {
                return {
                    type: 'GAUTH_INSTANCE',
                    payload: {}
                }
            });
        });
    }
}