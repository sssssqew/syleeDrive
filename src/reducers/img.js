import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
	post: {
		status: 'INIT',
		error: -1,
		files: []
	}
}

export default function img(state = initialState, action){
	switch(action.type){
		case types.IMG_POST:
			return update(state, {
				post: {
					status: { $set: 'WAITING' },
					error: { $set: -1 }
				}
			});
		case types.IMG_POST_SUCCESS:
			return update(state, {
				post: {
					status: { $set: 'SUCCESS' },
					files: { $push: [action.file] }
				}
			});
		case types.IMG_POST_FAILURE:
			return update(state, {
				post: {
					status: { $set: 'FAILURE' },
					error: { $set: action.error }
				}
			});
		default:
			return state;
	}
}