import axios from 'axios';

function initHttp(url){
	return (params)=>{
		return axios.get(url, {
			params
		})
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
		})
	};
}

export default (httpConfigObj)=>{
	let resObj = {};
	for(let key in httpConfigObj){
		const item = httpConfigObj[key];
		resObj[key] = initHttp(item.url);
	}
	return resObj;
};
