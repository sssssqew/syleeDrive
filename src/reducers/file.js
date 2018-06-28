import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
	post: {
		status: 'INIT',
		// error: -1,
		// files: []
	},
	list: {
		status: 'INIT',
		data: [],
		// isLast: false
	},
}

// 아무런 액션도 없으면 초기상태가 반환된다
// 즉 새로고침(F5)하면 초기상태가 반환된다 
// set : 이전값과 다른 경우에만 컴포넌트 업데이트 발생
// push: 이전값과 무조건 다르므로 update 발생함 
export default function file(state = initialState, action){
	switch(action.type){
		case types.FILE_UPLOAD:
			return update(state, {
				post: {
					status: { $set: 'WAITING' },
					// error: { $set: -1 }
				}
			});
		case types.FILE_UPLOAD_SUCCESS:
			return update(state, {
				post: {
					status: { $set: 'SUCCESS' },
					// files: { $push: [action.file] }
				}
			});
		case types.FILE_UPLOAD_FAILURE:
			return update(state, {
				post: {
					status: { $set: 'FAILURE' },
					// error: { $set: action.error }
				}
			});
		case types.FILE_LIST:
			return update(state, {
				list: {
					status: { $set: 'WAITING' }
				}
			});
		case types.FILE_LIST_SUCCESS:
			return update(state, {
				list: {
					status: { $set: 'SUCCESS' },
					data: { $set: action.data }
				}
			});
		case types.FILE_LIST_FAILURE:
			return update(state, {
				list: {
					status: { $set: 'FAILURE' }
				}
			});
		default:
			return state;
	}
}