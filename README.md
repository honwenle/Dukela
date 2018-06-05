# 都可拉

## 模块、功能 清单
- [x]主页（商品列表）-> [x]商品详情 -> [x]购买页面 -> [x]订单支付
- [x]山庄列表 -> [x]山庄详情+[x]房间列表 -> [x]房间详情 -> [x]预定页面
  - [x]订单支付
  - [-]商品抵扣
- [x]个人主页
  - [x]我的商品（概况+列表） -> [x]消费明细 -> [-]消费明细详情
  - [-]我的订单（tab：[-]商品订单+[ ]入住订单） -> [ ]订单详情
  - [x]我的消息
  - [x]设置（退出） -> [x]版本
  - [x]个人信息
    - [x]基本信息 -> [x]修改
    - [x]更换手机
    - [x]实名
    - [x]绑卡
    - [x]密码管理
      - [x]登录密码
      - [x]交易密码
    - [ ]微信
- 登录注册
  - [x]登录
  - [x]忘记密码
  - [ ]微信登录 -> [ ]绑定手机
  - [x]注册 -> [x]设置登录密码 -> [x]实名

## 使用文档
> 另见其它文档

## 文件结构
### Vue项目
```
├─build 开发打包配置(webpack vue vux相关)
├─config 项目配置
├─dist 打包输入目录
├─node_modules Nodejs依赖
├─src
│  ├─assets 静态资源
│  ├─components 组件
│  │  ├─back.vue
│  │  ├─dkl-header.vue
│  │  ├─list
│  │  ├─password
│  │  └─font-icon
│  ├─pages
│  │  └─... 各个页面
│  ├─router 路由
│  ├─scripts
│  │  ├─http.js axios配置封装
│  │  └─url.js 路径等常量
│  ├─store 数据管理
│  ├─styles 公共样式
│  ├─App.vue 入口vue文件
│  └─main.js 入口js文件
├─static
├─.babelrc ES6转码配置文件
├─.editorconfig 编辑器配置文件
├─.gitignore git忽略文件
├─.postcssrc postcss配置文件
├─index.html 入口html
├─package.json Nodejs依赖列表
└─README.md 项目说明文件
```
### ApiCloud项目
```
├─config.xml APP配置文件
├─index2.html vue入口文件
└─index.html 入口文件
```

## 开发、部署
### 开发
[API swagger](http://101.132.146.168:114/swagger/ui/index#/)
``` bash
# 安装依赖
npm install

# 在localhost:8080运行开发服务器
npm run dev

# 打包项目
npm run build
```
### 部署
> 方法1：静态资源打包进APP

1. 打包vue项目
2. 将打包后的dist里的所有文件丢到apicloud项目根目录
3. 同步代码
4. 云编译
> 方法2：打开webview引用远程地址

1. 打包vue项目
2. 将打包后的dist里的所有文件服务器目录