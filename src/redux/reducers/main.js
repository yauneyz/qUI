import {LOGOUT,LOGIN,SET_COLUMN,SET_IDEAS,SET_STATE, SET_LOADED, SET_RANDOM} from "../action_types";

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

		case LOGOUT: {
			const {loggedIn} = action.payload;
			return {
				...state,
				loggedIn: loggedIn,
			}
		};

		case SET_COLUMN: {
			const {id,name, data} = action.payload;
			let newBoards = state.boards;
			newBoards.columns[id].name = name
			newBoards.columns[id].data = data
			return {
				...state,
				boards:newBoards,
			}
		}

		case SET_IDEAS: {
			const {ideas} = action.payload;
			return {
				...state,
				boards:{
					...state.boards,
					ideas:ideas
				}
			}
		}

		default:
			return state;
	}
}

export {main};
