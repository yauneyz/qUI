import store from "../redux/store"
require('dotenv').config();

async function save(){
	// Create a post request to store the current boards array
	//const baseURL = process.env.BASE_URL
	const baseURL = "http://localhost:8000/";
	console.log("BASE URL: ",baseURL);
	const data = {boards: store.getState().boards}
	let res = await fetch(baseURL + "boards",{
		credentials: 'include',
		method: "PUT",
		body: JSON.stringify(data),
		headers: {'Content-Type':'application/json'}
	});

	console.log("Boards Updated",data);
}

export default save;
