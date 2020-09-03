# demo09

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
一、	使用的插件
"ant-design-vue": "^1.6.5"
"antd-theme-generator": "^1.1.7"，实现动态更换主题色的核心插件
"less": "^2.7.3",超过2.7版本实现动态更换主题色会有问题。建议版本2.7.3
二、	实现步骤
（一）插件安装
1、	使用脚手架搭建Vue项目
2、	使用yarn add ant-design-vue安装UI库
3、	因为ant-design-vue是依赖于less进行开发因此安装less和less-loader
4、	安装更换主题的核心插件 yarn add antd-theme-generator
（二）信息配置
1、index.html：public/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but newblog doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <link rel="stylesheet/less" type="text/css" href="/color.less" />
    <script>
        window.less = {
          async: false,
          env: 'production'
        };
   </script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js"></script>
  </body>
</html>
 
2、根目录添加color.js，并录入如下信息
const path = require('path');
const { generateTheme } = require('antd-theme-generator');
// ant-design-vue/dist/antd.less
const options = {
  antDir: path.join(__dirname, './node_modules/ant-design-vue'), //对应具体位置
  stylesDir: path.join(__dirname, './src/styles'),    //对应具体位置
  varFile: path.join(__dirname, './src/styles/variables.less'), //对应具体位置
  mainLessFile: path.join(__dirname, './src/styles/index.less'), //对应具体位置
  themeVariables: [
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@text-color-secondary',
    '@heading-color',
    '@layout-body-background',
    '@btn-primary-bg',
    '@layout-header-background'
  ],
  indexFileName: 'index.html',
  outputFilePath: path.join(__dirname, './public/color.less'),
}
generateTheme(options).then(() => {
  console.log('Theme generated successfully');
})
.catch(error => {
  console.log('Error', error);
});
 
3、src添加styles文件夹，里面有variables.less和main.less文件
variables.less文件内容：
@import "~/ant-design-vue/lib/style/themes/default.less";
@link-color: #00375B;
@primary-color: rgb(138, 164, 182);
:root { 
    --PC: @primary-color;   //color.less中加入css原生变量：--PC
 }
.primary-color{
  color:@primary-color
}
	Index.less文件为空
5、	package.json文件，主要修改scripts中的信息，目的是为了每次自动node color.js，所以scripts里面进行修改。
  "scripts": {
    "serve": "node color && vue-cli-service serve --mode dev",
    "build": "node color && vue-cli-service build --mode prod",
    "lint": "vue-cli-service lint"
  },
6、	通过方法实现更改主题色
  methods: {
    click (color) {
      this.color = color
      this.huan()
    },
    huan () {
      window.less
        .modifyVars({
          '@primary-color': this.color,
          '@link-color': this.color,
          '@btn-primary-bg': this.color
        })
        .then(() => {
          console.log('成功')
        })
        .catch(error => {
          alert('失败')
          console.log(error)
        })
    }
  }
三、	原理说明
我们发现其实他生效主要就是靠color生成一个color.less文件，然后我打开color.less文件看了下，发现原来是利用的less可以写逻辑这个特性实现的，从而通过window.less.modifyVars去动态的改变less变量。
