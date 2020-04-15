import  { apiUrls } from "../constants";
import axios from 'axios';

export const createStream = (newStreamData) => {
    return async (dispatch, getState) => {
        let {status, data} = await axios({
            method: 'post',
            url: apiUrls.createStream,
            data: newStreamData
        });
        if(status === 201) {
            // console.log(data);
            // dispatch(getStreams());
            dispatch({
                type: 'CREATE_STREAM',
                payload: { [data.id] : data }
            })
        }
    }
}

export const getStreams = () => {
    return async (dispatch) => {
        let {status, data} = await axios({
            method: 'get',
            url: apiUrls.getStreams,
        });
        if(status === 200) {
            let payload = {};
            data.forEach(element => {
                payload[element.id] = element;
            });
            dispatch({
                type: 'GET_STREAMS',
                payload: payload
            })
        }
    }
}

export const updateStream = (id, updatedStreamData) => {
    return dispatch => {
        return new Promise(async function(resolve, reject) {
            let {status, data} = await axios({
                method: 'put',
                url: `${apiUrls.editStream}/${id}`,
                data: updatedStreamData
            });
            
            if(status === 200) {
                dispatch({
                    type: 'EDIT_STREAM',
                    payload: data
                });

                resolve();
            } else {
                reject();
            }
        });
        
    }
}

export const deleteStream = (id) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            let {status} = await axios({
                method: 'delete',
                url: `${apiUrls.deleteStream}/${id}`,
            });
            if(status === 200) {
                dispatch({
                    type: 'DELETE_STREAM',
                    payload: id
                });
                resolve();
            }
        });
    }
}