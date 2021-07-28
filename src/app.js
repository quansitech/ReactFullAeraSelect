import ReactFullAreaSelect from './fullAreaSelect';


ReactFullAreaSelect('test', {
	level: 4,
	value: '441900107000',
	urlConfig: {
		getProvince: '/api/area/getProvince',
		getCity: '/api/area/getCityByProvince',
		getDistrict: '/api/area/getDistrictByCity',
		getStreet: '/api/area/getStreetByDistrict',
	},
});

