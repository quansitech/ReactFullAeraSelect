import service from "./service";
import axios from 'axios';

const http = {};

for(let i in service){
	const item = service[i];
	http[i] = ((params)=>{
		return axios.get(`${item.url}`, {
				params
			})
			.then(function (response) {
				return response.data;
			})
			.catch(function (error) {
				console.log(error);
			});
	});
}

export default http;
