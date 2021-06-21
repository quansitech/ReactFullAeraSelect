# 4级地址联动 ReactFullAddrSelect

	4级地址联动选择,可自定义联动的级别(省/市/区/街道)
    传入的隐藏域,自动生成相应的select下拉框

### 使用 :

```html
<script src="dist/index.js"></script>
```

初始化方法共两种:

- js配置初始化

  - ```
    ReactFullAreaSelect(id: String[, options: Object])
    id: INPUT_HIDDEN_ELEMENT_ID 
    ```

  - 与jquery一起食用:

```javascript
    $(INPUT_HIDDEN_ELEMENT).reactFullAreaSelect(options)
```

- html配置自动初始化
  不支持修改 urlConfig 属性

  ```html
  <div data-react-full-area-select data-name="area" data-level="4" data-value="440783"></div>
  ```

options配置如下
```javascript
options: {
  level: 3//default value
  name: 'area', //default: '',  input name attribute
  value: '440783', //default: '',  input value attrubute,
  urlConfig: { //default: {}, cover default api url.
    getProvince: '/api/area/getProvince', //default: '/api/area/getProvince.html',
    getCity: '/api/area/getCityByProvince',
    getDistrict: '/api/area/getDistrictByCity',
    getStreet: '/api/area/getStreetByDistrict',
  }
}
```



### 基本功能:

- 插件自动生成select,供用户选择




------------

# 调试

1.  运行yarn
2.  yarn run start
3.  调试代码在 src/app.js

## 打包

1. yarn run build
2. src/index.js 将被打包

