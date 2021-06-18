

# 4级地址联动 ReactFullAddrSelect

	4级地址联动选择,可自定义联动的级别

### 使用 :

- 用法

  - ```javascript
    ReactFullAreaSelect(id: String[, options: Object])
    id: div id //注意,是 div id
    ```

- 与jquery一起食用:

  ​	`$(INPUT_HIDDEN_ELEMENT).reactFullAreaSelect(options)`



​	html配置自动初始化

  ```html
  <div data-react-full-area-select data-name="area"></div>
  ```



`object: {`
`level: 3//default value`

​	`name: 'area', //default: '',  input name attribute`

​	`value: '440783', //default: '',  input value attrubute`

`}`



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

