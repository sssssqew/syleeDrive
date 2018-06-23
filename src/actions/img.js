import * as types from './ActionTypes';
import axios from 'axios';

//IMG POST 
export function imgPostRequest(data){
	return (dispatch) => {
		dispatch(imgPost());
		
		// state 변경시 무조건 setState 함수 사용하기 
        // state 배열 변경시 spread연산자나 immutability helper 사용하기 
        // 둘 이상의 태그를 배열에 추가할때는 div 태그로 묶어줘야 함
        // 상태를 저장하기 위해(새로고침 후에도 남아있으려면) 각 주소를 추후에 
        // redux로 보내서 액션을 통해 store에 주소 배열로 저장한다
        // 이미지 주소를 배열에 추가함
		return axios.post('http://localhost:8000/api/img/upload', data)
		.then((response) => {
			dispatch(imgPostSuccess());
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

export function imgPostSuccess(){
	return {
		type: types.IMG_POST_SUCCESS
	}
}

export function imgPostFailure(error){
	return {
		type: types.IMG_POST_FAILURE,
		error
	}
}

// IMG LIST
export function imgListRequest(){
	return (dispatch) => {
		dispatch(imgList());

		return axios.get('http://localhost:8000/api/img/upload')
		.then((response) => {
			dispatch(imgListSuccess(response.data));
		}).catch((error) => {
			dispatch(imgListFailure());
		})
	}
}

export function imgList(){
	return {
		type: types.IMG_LIST
	}
}

export function imgListSuccess(data){
	return {
		type: types.IMG_LIST_SUCCESS,
		data
	}
}

export function imgListFailure(){
	return {
		type: types.IMG_LIST_FAILURE
	}
}