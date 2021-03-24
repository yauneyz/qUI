import { LOGIN,SET_LOADED, SET_RANDOM, SET_STATE } from "./action_types.js"
import random from '../utils/randomizer'

export const setStoreState = function(data){
	return {
		type: SET_STATE,
		payload: {
			data
		}
	}
};

export const setLoaded = loaded => ({
	type: SET_LOADED,
	payload: {
		isLoaded: loaded
	}
});

export const setRandom = function() {
	const randoms = [random() ,random() ,random()];
	return {
		type: SET_RANDOM,
		payload: {
			randoms
		}
	};
}

export const login = function() {
	return {
		type: LOGIN,
		payload: {
			loggedIn: true
		}
	};
}
