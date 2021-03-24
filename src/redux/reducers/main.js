import {LOGIN,SET_STATE, SET_LOADED, SET_RANDOM} from "../action_types";

const initialState = {
	boards: [],
	isLoaded: false,
	loggedIn: false,
	randoms: ["","",""]
};

function main(state = initialState, action){
	switch (action.type) {
		case SET_STATE: {
			const { data } = action.payload; return {
				...state,
				boards: data
			}
		};

		case SET_LOADED: {
			action.payload = {isLoaded:true};
			const {isLoaded} = action.payload;
			return {
				...state,
				isLoaded: isLoaded
			}
		};

		case SET_RANDOM: {
			const {randoms} = action.payload;
			return {
				...state,
				randoms: randoms
			}
		};

		case LOGIN: {
			const {loggedIn} = action.payload;
			return {
				...state,
				loggedIn: loggedIn,
			}
		};
		

		default:
			return state;
	}
}

export {main};
