import * as types from './ActionTypes';
import axios from 'axios';

//IMG POST 
export function FileUploadRequest(data, callback){
	return (dispatch) => {
		dispatch(fileUpload());
		
		// state 변경시 무조건 setState 함수 사용하기 
        // state 배열 변경시 spread연산자나 immutability helper 사용하기 
        // 둘 이상의 태그를 배열에 추가할때는 div 태그로 묶어줘야 함
        // 상태를 저장하기 위해(새로고침 후에도 남아있으려면) 각 주소를 추후에 
        // redux로 보내서 액션을 통해 store에 주소 배열로 저장한다
        // 이미지 주소를 배열에 추가함
		return axios.post('http://localhost:8000/api/files/upload', data, callback)
		.then((response) => {
			dispatch(fileUploadSuccess());
		}).catch((error) => {
			dispatch(fileUploadFailure());
		})
	}		
}

export function fileUpload(){
	return {
		type: types.FILE_UPLOAD
	}
}

export function fileUploadSuccess(){
	return {
		type: types.FILE_UPLOAD_SUCCESS
	}
}

export function fileUploadFailure(){
	return {
		type: types.FILE_UPLOAD_FAILURE
	}
}

// IMG LIST
export function FileListRequest(){
	return (dispatch) => {
		dispatch(fileList());

		return axios.get('http://localhost:8000/api/files/upload')
		.then((response) => {
			dispatch(fileListSuccess(response.data));
		}).catch((error) => {
			dispatch(fileListFailure());
		})
	}
}

export function fileList(){
	return {
		type: types.FILE_LIST
	}
}

export function fileListSuccess(data){
	return {
		type: types.FILE_LIST_SUCCESS,
		data
	}
}

export function fileListFailure(){
	return {
		type: types.FILE_LIST_FAILURE
	}
}