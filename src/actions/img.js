import * as types from './ActionTypes';
import axios from 'axios';

//IMG POST 
export function imgPostRequest(data){
	return (dispatch) => {
		dispatch(imgPost());

		return axios.post('http://localhost:8000/upload', data)
		.then((response) => {
			dispatch(imgPostSuccess(response.data.file));
		}).catch((error) => {
			dispatch(imgPostFailure(error));
		})
	}		
}

export function imgPost(){
	return {
		type: types.IMG_POST
	}
}

export function imgPostSuccess(file){
	return {
		type: types.IMG_POST_SUCCESS,
		file
	}
}

export function imgPostFailure(error){
	return {
		type: types.IMG_POST_FAILURE,
		error
	}
}