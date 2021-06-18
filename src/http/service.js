export default {
	getProvince: {
		// url: '/Home/FormatDBCont/gets',
		url: '/api/area/getProvince.html',
	},
	getCity: {
		// url: '/Library/LibraryConfig',
		url: '/api/area/getCityByProvince.html',
	},
	getDistrict: {
		// url: '/Library/Login',
		url: '/api/area/getDistrictByCity.html',
	},
	getStreet: {
		url: '/api/area/getStreetByDistrict.html',
	},
};
