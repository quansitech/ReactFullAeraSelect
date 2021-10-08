import React, {useEffect, useState} from 'react';
import initService from '../http';
import defaultService from "../http/service";
import Util from "../Util";

function FullAreaSelect(props) {
	let {level, value = '', urlConfig = {}} = props;
	value = String(value);
	const MAX_LEVEL = 4;
	level = Math.min(level, MAX_LEVEL);
	let http = null;
	
	const LEVEL_ENUM = {
		province: 1,
		city: 2,
		district: 3,
		street: 4,
	}
	
	const DEFAULT_CONF = initDefaultConf({
		province: {
			defaultText: '请选择省',
			data: [],
			value: getFillZeroValueByLevel(value, LEVEL_ENUM.province),
			level: LEVEL_ENUM.province,
		},
		city: {
			defaultText: '请选择市',
			data: [],
			level: LEVEL_ENUM.city,
			value: getFillZeroValueByLevel(value, LEVEL_ENUM.city),
			reqKey: 'province_id',
		},
		district: {
			defaultText: '请选择县/市/区',
			data: [],
			value: getFillZeroValueByLevel(value, LEVEL_ENUM.district),
			level: LEVEL_ENUM.district,
			reqKey: 'city_id',
		},
		street: {
			defaultText: '请选择镇/街道',
			data: [],
			value: getFillZeroValueByLevel(value, LEVEL_ENUM.street),
			level: LEVEL_ENUM.street,
			reqKey: 'district_id',
			isLast: true,
		}
	});
	
	let [provinceData, setProvinceData] = useState(DEFAULT_CONF.province);
	let [cityData, setCityData] = useState(DEFAULT_CONF.city);
	let [districtData, setDistrictData] = useState(DEFAULT_CONF.district);
	let [streetData, setStreetData] = useState(DEFAULT_CONF.street);
	
	let [allDataArr, setAllDataArr] = useState(getNewAllDataArr());
	let [allDataObj, setAllDataObj] = useState(getNewAllDataObj());
	
	let [addrVal, setAddrVal] = useState(value);
	
	useEffect(() => {
		updateAllData();
	}, [
		provinceData,
		cityData,
		districtData,
		streetData,
	]);

	useEffect(() => {
		updateDataByLevel(districtData.level, {
			data: [],
			value: '',
		});
		updateDataByLevel(streetData.level, {
			data: [],
			value: '',
		});
	}, [
		provinceData,
	]);

	useEffect(() => {
		updateDataByLevel(streetData.level, {
			data: [],
			value: '',
		});
	}, [
		cityData,
	]);
	
	useEffect(() => {
		initUrl();
	});
	
	function initUrl(){
		const URL_CONFIG_COPY = {...urlConfig};
		for(let key in URL_CONFIG_COPY){
			URL_CONFIG_COPY[key] = {
				url: URL_CONFIG_COPY[key],
			}
		}
		const NEW_URL_CONFIG = Object.assign({}, defaultService, URL_CONFIG_COPY);
		http = initService(NEW_URL_CONFIG);
	}
	
	function initDefaultConf(defaultConf) {
		let newAllData = {};
		for (let i in defaultConf) {
			let item = defaultConf[i];
			const CAN_INCLUDE = item.level <= level;
			newAllData[i] = {
				...item,
				name: i,
				show: CAN_INCLUDE,
				initValue: value,
				districtValue: getFillZeroValueByLevel(value, LEVEL_ENUM.district),
				isLast: item.isLast || (level < item.level),
			};
		}
		return newAllData;
	}
	
	function getNewAllDataObj() {
		return {
			province: provinceData,
			city: cityData,
			district: districtData,
			street: streetData,
		};
	}
	
	function getNewAllDataArr() {
		return [
			provinceData,
			cityData,
			districtData,
			streetData,
		];
	}
	
	function updateAllData() {
		setAllDataArr(getNewAllDataArr());
		setAllDataObj(getNewAllDataObj());
	}
	
	
	function getFillZeroValueByLevel(value, level){
		let res = '';
		const MAX_VALUE_LENGTH = 12;
		const DISTRICT_VALUE_LENGTH = 6;
		
		value = value.padEnd(MAX_VALUE_LENGTH, '0');
		
		if(level === LEVEL_ENUM.street){
			res = value;
		}else if(level){
			res = value.slice(0, level * 2).padEnd(DISTRICT_VALUE_LENGTH, '0');
		}else{
			res = value;
		}
		return res;
	}
	
	function handleCityValue(cityDataList){
		const searchDistrictResult = cityDataList.filter((item)=>{
			return item.id === cityData.districtValue;
		});
		const hasValue = searchDistrictResult.length;
		if(hasValue){
			updateDataByLevel(cityData.level, {
				data: cityDataList,
				value: cityData.districtValue,
			});
		}
	}
	
	function initDefaultSelectValue(level) {
		getData('province').then(()=>{
			if(!value){
				return Promise.reject();
			}
			if(level === LEVEL_ENUM.province){
				return Promise.reject();
			}
			if(level >= LEVEL_ENUM.city){
				return getData('city', provinceData.value).then(handleCityValue);
			}
		}).then(()=>{
			if(level >= LEVEL_ENUM.district){
				return getData('district', cityData.value);
			}
		}).then(()=>{
			if(level >= LEVEL_ENUM.street){
				return getData('street', districtData.value);
			}
		}).catch(e=>e);
	}
	
	useEffect(() => {
		initDefaultSelectValue(level);
	}, []);
	
	function getData(name, value = '', isReset = false) {
		const {reqKey, level} = allDataObj[name];
		let params = {};
		if (reqKey) {
			params = {
				[reqKey]: value
			};
		}
		
		return http[`get${Util.upperCaseFirstLetter(name)}`](params)
			.then((data) => {
				if(data){
					const NEW_DATA = {
						data,
					};
					if(isReset){
						NEW_DATA.value = '';
					}
					updateDataByLevel(level, NEW_DATA);
					return data;
				}else{
					return Promise.reject(false);
				}
			}).catch(e => {
				const NEXT_ITEM = allDataArr[level];
				if(NEXT_ITEM && NEXT_ITEM.show){
					getData(NEXT_ITEM.name, value);
				}
			});
	}
	
	function updateDataByLevel(level, data){
		switch(level) {
			case LEVEL_ENUM.province:
				setProvinceData(Object.assign({}, provinceData, data));
				break;
			case LEVEL_ENUM.city:
				setCityData(Object.assign({}, cityData, data));
				break;
			case LEVEL_ENUM.district:
				setDistrictData(Object.assign({}, districtData, data));
				break;
			case LEVEL_ENUM.street:
				setStreetData(Object.assign({}, streetData, data));
				break;
			default:
				break;
		}
	}

	function getValueByItem(level){
		var resultArr = allDataArr.filter((item)=>{
			return item.level === level;
		});
		return resultArr[0] && resultArr[0].value;
	}
	
	function handleChange(e, data) {
		let value = e.target.value;
		const SHOULD_FILL_PREV_VALUE = !value && data.level > 1;
		if(SHOULD_FILL_PREV_VALUE){
			const PREV_LEVEL_VALUE = getValueByItem(data.level - 1);
			value = PREV_LEVEL_VALUE;
		}
		updateDataByLevel(data.level, {
			value,
		});
		setAddrVal(value);
		if(!data.isLast){
			const NEXT_ITEM = allDataArr[data.level];
			getNextData(NEXT_ITEM, value);
		}
	}
	
	function getNextData(nextItem, prevValue){
		updateDataByLevel(nextItem.level, {
			value: '',
			data: [],
		});
		if(prevValue){
			getData(nextItem.name, prevValue, true);
		}
	}
	
	
	return <React.Fragment>
		{allDataArr.map((item, index) => {
			return <React.Fragment key={index}>
				{item.show ? <div className={`react-select-addr-box`}>
						<select key={index}
										 name={item.name}
										 value={item.value}
										 data-level={item.level}
										 data-init-value={item.initValue}
										 className={`react-select-addr react-select-addr-${item.name} ${props.selectClassName || ''}`}
										 disabled={!item.data}
										 onChange={(e)=>handleChange(e, item)}>
						<option value={''}>
							{item.defaultText}
						</option>
						{item.data.map((data, dataIndex) => {
							return <option
								key={data.id}
								value={data.id}>
								{data.cname}
							</option>;
						})}
					</select>
				</div> : <></>}
			</React.Fragment>
		})}
		<input type="hidden" value={addrVal} name={props.name || ''} />
	</React.Fragment>;
}

export default FullAreaSelect;
