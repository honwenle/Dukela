# 都可拉

## 模块、功能 清单
- [x]主页（商品列表）-> [x]商品详情 -> [x]购买页面 -> [x]订单支付
- [x]山庄列表 -> [x]山庄详情+[x]房间列表 -> [x]房间详情 -> [x]预定页面
  - [x]订单支付
  - [x]商品抵扣
- [x]个人主页
  - [x]我的商品（概况+列表） -> [x]消费明细 -> [x]消费明细详情
  - [x]我的订单（tab：[x]商品订单+[x]入住订单） -> [x]订单详情
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
    - [x]微信
- 登录注册
  - [x]登录
  - [x]忘记密码
  - [x]微信登录 -> [x]绑定手机
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
│  │  ├─back.vue 返回按钮
│  │  ├─dkl-header.vue 头部
│  │  ├─list.vue 回弹列表，刷新、加载
│  │  ├─re-confirm.vue 中断实名提醒框
│  │  ├─sms-send.vue 短信发送
│  │  ├─password.vue 密码框
│  │  └─font-icon 字体图标
│  ├─pages
│  │  ├─bind-card.vue 绑卡
│  │  ├─buy.vue 商品下单
│  │  ├─change-phone.vue 修改手机号
│  │  ├─check-phone.vue 验证手机
│  │  ├─deduct.vue 抵扣选择
│  │  ├─detail-reserve.vue 预约订单详情
│  │  ├─detail.vue 商品订单详情
│  │  ├─goods-record.vue 商品明细列表
│  │  ├─goods.vue 商品详情
│  │  ├─home.vue 主页（商品列表）
│  │  ├─login.vue 登录
│  │  ├─main.vue 主页容器
│  │  ├─mall.vue 商城？
│  │  ├─me.vue 我的
│  │  ├─messages.vue 消息列表
│  │  ├─my-goods.vue 我的商品库
│  │  ├─my-order.vue 我的订单列表
│  │  ├─my-password.vue 我的密码
│  │  ├─my-realname.vue 我的实名
│  │  ├─pay-public.vue 付款-对公转账
│  │  ├─pay.vue 付款（收银台）
│  │  ├─realname.vue 实名
│  │  ├─record-detail.vue 商品明细详情
│  │  ├─register.vue 注册
│  │  ├─reserve.vue 预定下单
│  │  ├─result.vue 支付/预定结果
│  │  ├─room.vue 房间详情
│  │  ├─set-password.vue 设置登录密码
│  │  ├─set-tran-pwd.vue 设置交易密码
│  │  ├─settings.vue 设置
│  │  ├─user.vue 用户信息
│  │  ├─version.vue 版本
│  │  ├─villa.vue 山庄详情
│  │  ├─villaList.vue 山庄列表
│  │  └─wx-reg.vue 微信注册
│  ├─router 路由
│  ├─scripts
│  │  ├─http.js axios配置封装
│  │  ├─filter.js 过滤器
│  │  └─url.js 路径等常量
│  ├─mixins 混合共用代码
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
├─vue.html vue入口文件
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