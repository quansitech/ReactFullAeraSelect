import ReactFullAreaSelect from './fullAreaSelect';


function fontRem() {
	var designW = 720;
	var html = document.getElementsByTagName('html')[0];
	var winW = Math.min(html.offsetWidth, 414);
	html.style.fontSize = (winW / designW) * 100 + 'px';
}
fontRem();
window.onresize = fontRem;

ReactFullAreaSelect('test', {
	level: 3,
	value: '440783',
	urlConfig: {
		getProvince: '/api/area/getProvince',
		getCity: '/api/area/getCityByProvince',
		getDistrict: '/api/area/getDistrictByCity',
		getStreet: '/api/area/getStreetByDistrict',
	},
});

