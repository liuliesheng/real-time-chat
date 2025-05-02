# fast-mobile-app & uni-app

## 介绍

**fast-mobile-app** 是一个基于 uni-app 开发的移动应用的框架，它抽离和封装了日常开发中的80%的常规业务逻辑，在开发中无需额外编写复杂难以维护的业务逻辑，
为你的应用提供了一整套健壮的能力，在1分钟内即可拥有一套完整的应用

1. 用户授权（底层API优化，并和后端接入进行抽象，后端按照指定的要求处理程序即可）
2. 请求封装（日常开发中最常用的无非就是网络请求和后端进行交互，借鉴Axios设计思想对原始的Http进行封装处理，同时提供一整套请求鉴权处理机制）
3. 多文件上传（多文件上传，再也不不用写太多的代码了，内部目前支持：远程上传、七牛上传驱动，有兴趣的同学可以扩展OSS和COS上传驱动以满足开发中的需求）
4. 事件监听（多页面复杂数据传递，再也不用编写复杂的代码）
5. 中间件（小程序启动时要处理复杂的业务）
6. 发布/订阅者
7. 原生JS函数扩展等
8. 日期时间的转换
9. 数据验证（快速验证数据是否合法）

#### 软件架构

**遵循配置优先，从繁杂的业务逻辑中解脱您的双手，让更多细节变得清晰可控**，框架本身提供的API是通过服务注册模式完成的， 在任何地方均可使用uni.$[API名称]进行使用，如：uni.$getUserInfo()

1. 使用 uni-app 作为底层依托可输出多端应用（微信小程序、支付宝小程序、App、H5等）
2. 抽离大量重复且庞杂代码作为核心业务驱动
3. 可根据业务需求随时定制的业务代码
4. 预置大量日常开发中常用的组件
5. 整合高颜值，高效率的小程序组件库（ColorUI）
6. 整合强大的CSS动画库并进行对移动端相关优化（animation.css）
7. 数据模式可以构建复杂的应用

**目录说明**

    ├─bootstrap                             核心框架目录
    │  ├─boots                        		小程序启动时相关服务注册
	│  │  ├─es6                        		ES6 语法扩展目录
	│  │  ├─native                          小程序原生语法扩展目录
	│  │  │  ├─floatings                    其他厂商小程序API向微信小程序API对齐
	│  │  │  ├─base.js                      小程序基本API扩展
    │  │  │  ├─location.js                  小程序定位API扩展（待废弃）
    │  │  │  ├─mixin.js                    	混合Component,Page,App函数创建的实例
    │  │  │  ├─ui.js                    	注册相关ui快捷操作方法
    │  │  │  ├─user.js                    	优化用户信息相关方法
	│  │  │  └─...                         	其他
    │  │  ├─config.js                    	注册应用配置服务
    │  │  ├─downrefresh.js                  下拉刷新扩展（可配置提示音，待废弃）
    │  │  ├─event.js                    	注册事件器服务
    │  │  ├─http.js                    		注册请求器服务
    │  │  ├─map-api.js                    	注册腾讯地图API服务
    │  │  ├─middleware.js                   注册中间件服务
    │  │  ├─promise-cache.js                注册Promise缓存器服务
    │  │  └─util.js                         注册相关工具方法服务
    │  │
    │  ├─http                               Http库
    │  │  ├─request.js                   	请求器
    │  │  ├─uploader.js                     上传器
	│  │  ├─logins                          相关登录器存放目录
	│  │  │  ├─account.js                   普通账号密码登录器，适用于H5
	│  │  │  ├─official.js                  微信公众号登录器，适用于H5
	│  │  │  ├─basic.js                     小程序登录器
	│  │  │  └─...                         	其他
    │  │  └─...                         	其他
	│  │
    │  ├─libs                               第三方模块目录
    │  │  ├─qqmap-wx-jssdk.min.js           腾讯地图包
    │  │  ├─bignumber.js           			BigNumber.js 用来处理对小数点精度比较高的业务逻辑（涉及到金额计算或对数字精度要求的必备类库）
    │  │  └─...                         	其他
    │  │
    │  ├─util                               相关助手库
	│  │  ├─collection.js                   集合助手库
	│  │  ├─function.js                     函数助手库
	│  │  ├─number.js                       数字助手库
	│  │  ├─string.js                       字符串助手库
	│  │  └─time.js                         时间助手库
	│  │
    │  ├─$.js                     			全局对象扩展（wx,my,swan,tt）
    │  ├─cache.js                       	缓存器
    │  ├─events.js                          事件器
    │  ├─middleware.js                      中间件
    │  ├─publisher.js                       发布者
    │  ├─uploader.js                        上传器
    │  └─validate.js                        验证器
    │
    ├─common                                公共目录
    │  ├─config                             配置目录
    │  │  ├─https                              https拦截器存放目录
    │  │  │  ├─basic.request.interceptor.js    请求拦截器
    │  │  │  ├─basic.response.interceptor.js   响应拦截器
    │  │  │  └─...                         	其他
    │  │  ├─middlewares                        中间件存放目录
    │  │  │  ├─app-show-params.js              集合助手库
    │  │  │  └─...                             其他更多中间件
    │  │  ├─app.js                             应用配置
    │  │  ├─http.js                            请求器配置
    │  │  ├─middleware.js                      中间件配置
    │  │  ├─page.js                            Page实例混合
    │  │  ├─component.js                       component实例混合
    │  │  └─upload.js                          上传配置
    │  │
    │  ├─middlewares                         中间件目录
    │  ├─models                              数据模型目录
    │  ├─services                            自定义服务目录
    │  └─styles                              自定义样式目录
    │  
	├─components                             自定义组件目录
    │  └─...                                 更多
    │
    ├─static                                静态资源存放目录
	│  └─icons                              更多
    │
    ├─pages                                 页面存放目录
    │  └─...                                更多
    │
    ├─tests                                 测试文件
    ├─app.vue                                
    ├─main.js
    ├─pages.json
    └─README.md

## 安装教程

方式一：开箱即用

## 使用说明

在小程序 main.js 中引入 bootstrap/index.js 全局api,配置加载等等一切都可以运转起来了。

```javascript
// main.js
import "./bootstrap/index";
// 相关API会自动注入到 `uni.$` 变量下
```

### 配置总览

框架所有的业务配置均在 common/config 目录下。

> common/config/app.js

```javascript
// 应用基础配置
// 获取配置 $.$config
module.exports = {
	// 应用ID
	accessId: '',
	// 应用密钥
	accessKey: '',
	// 签名类型
	signType: 'md5',

	// 版本号
	version: '1.0',

	// 订阅消息模板ID
	tmplIds: [],

	// 自动订阅模板消息
	autoSubscribeTmplMsg: true,

	// 登录用户缓存标识
	userInfoKey: '__USER_INFO__',

	// 登录用户SessionId标识
	sessionIdKey: '__SESSION__',

	// 登录成功后的回调
	onLogged: function(res) {
		console.info('app.onLogged', res)
	},

	// 登出成功后的回调
	onLogout: function(res) {
		console.info('app.onLogout', res)
	},

	// 当前用户信息发生变更
	onUserChange: function({detail: user}) {
		console.info('user info change:', user);
	},

	// 跳转地址
	onLinkTo: function(url, type) {
	},

	// 腾讯地图key列表
	QQMapKeys: [],

	// 下来刷新完成提示音
	stopPullDownRefreshAudio: '',
};
```

> common/config/http.js

```javascript
import $ from '../../bootstrap/$';

// http基础配置
// const baseURL = 'http://localhost/api';
module.exports = {
	// 默认选项配置
	defaults: {
		// 网络请求基础URL
		baseURL: baseURL,

		// 是否返回原始数据
		returnRaw: false,

		// 是否显示错误提示语
		isShowErrorTips: true,
	},

	// 使用小程序原始登录器
	// #ifdef MP
	login: uni.$logins.weapp, // 使用小程序原始登录器
	loginUrl: baseURL + '/weapp_login', // 登录地址
	loginUserInfo: true, // 登录时是否获取用户信息
	// #endif

	// 使用账户登录器
	// #ifdef H5
	login: uni.$logins.account, // 使用账户登录
	loginUrl: baseURL + '/login', // 登录地址
	loginPage: '/pages/auth/login', // 自定义登录页面地址
	// #endif

	// 所有请求回调
	onRequest: function(config) {
	},

	// 业务成功码
	successCode: 1,
	// 业务成功处理器（所有通过的业务请求，都会回调此函数）
	onSuccess: function(data, response) {
	},

	// 默认提示语
	loadingText: '请稍后...',
	errorTips: '网络错误，请稍后~', // 默认错误提示语
	loginAuthTips: '此操作需要您授权基本信息', // 授权提示语
	loginAuthFailedTips: '请先授权后，进行重试~', // 授权失败提示语
	loginFailedMsg: '登录失败，请稍后再试~', // 登录失败提示语

	// 登录失效错误码
	loginInvalidCode: -1,
	// 登录最大尝试次数
	loginMaxCount: 1,
	// 登录超时操作
	onLoginTimout: function(config, response) {
		$.showModal({
			content: '登录超时，请稍后再试~',
			showCancel: false
		});
	},

	// 无权限错误码
	unauthorizedCode: -10,
	// 无权限处理器
	onUnauthorized: function(config, response) {
		uni.$http.resolveModal(config)({
			title: '温馨提示',
			content: '暂无权限，详细请查看权限说明？',
			showCancel: true,
			confirmColor: '#2E8B57',
			confirmText: '了解一下',
			success: (res) => {
				if (res.cancel) {
					return;
				}

				$.navigateTo({
					url: '/pages/auth/unauthorized'
				});
			}
		});
	},

	// 其他业务处理器
	logicErrors: {
		// '40000': function(data, response) { // 数据验证错误
		// }
	},

	// 默认HTTP错误处理器
	statusErrors: {
		'404': function(config, response) {
			if (config.method.toUpperCase() === 'GET') {
				$.navigateBack();
			}
		},
		// '500': function(response) {
		// },
	},

	// 请求拦截器
	requestInterceptors: [
		uni.$http.basicRequestInterceptor,
	],

	// 响应拦截器
	responseInterceptors: [
		uni.$http.basicResponseInterceptor
	]
};
```

> common/config/upload.js

```javascript
// 上传配置
module.exports = {
	// 默认磁盘
	disk: 'qiniu',

	// 上传驱动
	disks: {
		// 远程服务器上传
		remote: {
			driver: 'remote',
			url: '/upload'
		},

		// 七牛上传
		qiniu: {
			driver: 'qiniu',

			// 获取token信息地址，优先级最高
			tokenInfoUrl: '/upload/token',

			// 七牛配置(获取token地址)
			// uptokenURL: 'https://yourserver.com/api/uptoken',
			// uptoken: 'xxxx',
			// domain: 'http://yourserver.com/'
			// region: 'NCN', // 华北区
		}
	}
};
```

### 网络请求

**基本请求**

```javascript
// GET 请求
uni.$http.get(uri, data, options).then(() => console.log, err => console.error);

// POST 请求
uni.$http.post(uri, data, options).then(() => console.log, err => console.error);

// PUT 请求
uni.$http.put(uri, data, options).then(() => console.log, err => console.error);

// DELETE 请求
uni.$http.delete(uri, data, options).then(() => console.log, err => console.error);
```

**参数说明**

    uri:String 请求的URL，如果在 /common/config/http.js 中设置了baseURL，那么你可以在此处使用相对路径
    data:Object 请求的参数，GET与DELETE请求中是query参数，POST与PUT请求时是body参数
    options:Object 请求选项，如果在请求过程中，你有额外对请求的一些描述时，它是非常有用的，比如发送一个请求时
    让它弹窗一个loading，请求失败或业务失败的时候进行Toast提示，当然这些在内部已经进行智能判断了，实际上在开发过程中
    如无特殊请求描述，无需指定此参数，下面会展示完整的options参数细节：

```javascript
// options:Object 描述
const options = {

	// 是否显示错误提示语
	isShowErrorTips: true,

	// 是否返回原始数据
	returnRaw: false,

	// 是否显示成功提示
	successTips: undefined, // POST,PUT 为true，其他为false

	// 提示器
	hint: {
		hintSuccess: function(msg) {
		},
		hintError: function(msg) {
		}
	},

	// 模态框提示器，一版用于强提醒
	modal: function(options: ModalOptions) {
	},

	// 是否显示loading
	loading: Boolean | String | {
		showLoading: function() {
		},
		hideLoading: function() {
		}
	},
	// loading 显示文字
	loadingText: String,

	// http status error
	statusErrors: {
		'404': function(config, response) {
		}
	},

	// 应用业务失败
	logicErrors: {
		'40040': function(data, response) {
		}
	}
}
```

**文件上传**

除了基本的网络请求，在日常开发中，上传应该是比较高频的一个操作，在每个上传地方都写大量的上传业务逻辑，哦， 想想都很头大，那么现在回到这里，上传将变的轻而易举。

```javascript
// 上传文件
uni.$upload({
	filePath: '',
	formData: {},
	name: 'file'
}).then(() => console.log, err => console.error)
```

### 事件

跨页面数据传递，将不用在通过getApp().globalData进行传递，使用getApp().globalData进行传递数据时，很容易出现混乱， 而且不利于维护，通过事件进行数据传递，可解锁更多的场景实现。

在框架中用户的鉴权机制即基于事件机制实现的。

**基本使用**

```javascript
// 监听一个事件
wx.emitter.on('choose.address', function(address) {
	console.log(address);
});

// 触发一个事件
wx.emitter.emit('choose.address', {
	adddress: '郑州郑东新区...'
});

// 监听一个事件，只执行一次
wx.emitter.once('choose.address', function(address) {
	console.log(address);
});

// 监听一个事件，只执行一次
wx.emitter.once('choose.address', function(address) {
	console.log(address);
});

// 移除一个监听回调
wx.emitter.on('choose.address', function addressFn(address) {
	console.log(address);
	wx.emitter.off('choose.address', addressFn);
});
```

**全局事件监听**

> common/mixins/page.js 扩展page实例方法

```javascript
// 全局事件监听
module.exports = {
	// 监听用户授权跳转
	'sys.getUserInfo.to': function() {
		console.log('sys.getUserInfo.to...');
		const page = $.$getCurrentPage();
		if (page.onLogin && page.onLogin(options) !== false) {
			return;
		}

		$.navigateTo({
			url: '/pages/auth/auth'
		});
	}
};
```

### 数据验证

> 实例化模式，一般用于表单提交前的验证

```javascript
// 验证规则，格式：字段名:[验证规则1,[带参数验证规则,参数]...]
const rules = {
	'title': ['require', ['len', '3,48'], 'chsDash'],
	'name': ['require', ['len', '2,24'], 'alphaDash'],
	'age': ['require', ['egt', 18], ['elt', 32]]
};

//提示信息
const messages = {
	'title.len': '标题文字长度请输入3-48个字符之间'
};

//字段对应的中文名称
const fields = {
	'title': '标题',
	'name': '名称',
	'age': '年龄'
};

//实例化验证类
const validate = new wx.Validate(rules, messages, fields);

//要验证的数据
const data = {
	title: '你好',
	name: 'helloworld',
	age: '45'
};

//检查数据
if (validate.check(data)) {
	console.log('validate success!');
} else {
	console.error('validate fail:', validate.getError());
}


// 静态调用
console.log('必须存在：', wx.Validate.is(undefined, 'require'));
console.log('只允许字母：', wx.Validate.is('abcd', 'alpha'));
console.log('只允许字母和数字：', wx.Validate.is('abcd124', 'alphaNum'));
console.log('只允许字母、数字和下划线 破折号：', wx.Validate.is('abcd124--', 'alphaDash'));
console.log('只允许汉字：', wx.Validate.is('abcd124', 'chs'));
console.log('只允许汉字、字母：', wx.Validate.is('abcd124', 'chsAlpha'));
console.log('只允许汉字、字母和数字：', wx.Validate.is('abcd124', 'chsAlphaNum'));
console.log('只允许汉字、字母、数字和下划线_及破折号-：', wx.Validate.is('abcd124', 'chsAlphaNum'));
console.log('是否为邮箱地址：', wx.Validate.is('110@.com', 'email'));
console.log('验证是否为11位手机号：', wx.Validate.is('13673679989', 'mobile'));
console.log('验证是否为座机电话：', wx.Validate.is('0371-4569-225', 'tel'));
console.log('是否为IP地址：', wx.Validate.is('127.0.0.1', 'ip'));
console.log('是否为一个URL地址：', wx.Validate.is('127.0.0.1', 'url'));
console.log('是否为float：', wx.Validate.is('127.0.0.1', 'float'));
console.log('是否是数字：', wx.Validate.is('48.56', 'number'));
console.log('是否为整型：', wx.Validate.is('48.56', 'integer'));
console.log('是否为布尔值：', wx.Validate.is('false', 'boolean'));
console.log('是否为数组：', wx.Validate.is([], 'array'));
```

### 工具方法

```javascript
// 随机打乱数组
wx.collectionUtil.shuffle(arr)

// 从 list中产生一个随机样本。传递一个数字表示从list中返回n个随机元素。否则将返回一个单一的随机项。
wx.collectionUtil.sample = function(arr, n, guard)

// 将多维数组拉平
wx.collectionUtil.flatten(array, shallow)

// 返回传入 arrays（数组）交集。结果中的每个值是存在于传入的每个arrays（数组）里。
wx.collectionUtil.intersection(arr
..)

// 取两个数组的差集
wx.collectionUtil.difference(arr
...)

// 它类似于map，但是这用于对象。转换每个属性的值。
wx.collectionUtil.mapObject(obj, iteratee)

// 尝试执行方法
wx.functionUtil.safeCallback(func, param, thisArg)

// 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，至少每隔 wait毫秒调用一次该函数。对于想控制一些触发频率较高的事件有帮助。
wx.functionUtil.throttle(func, wait, options)

// 返回 function 函数的防反跳版本, 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 wait 毫秒之后.
wx.functionUtil.debounce(func, wait, immediate)

// 创建一个函数,调用不超过count 次。 当count已经达到时，最后一个函数调用的结果将被记住并返回。
wx.functionUtil.before(func, count)

// 创建一个只能调用一次的函数。重复调用改进的方法也没有效果，只会返回第一次执行时的结果。
wx.functionUtil.once(func)

// 创建一个函数, 只有在运行了 count 次之后才有效果. 在处理同组异步请求返回结果时,
wx.functionUtil.after(func, count)

// 大于未来某个时刻可是执行
wx.functionUtil.gtFuture(func, wait, context)

// 小于未来某个时刻可是执行
wx.functionUtil.ltFuture(func, wait, context)

// 左填充
wx.stringUtil.leftFill(str, num, fillStr)

// 右填充
wx.stringUtil.rightFill(str, num, fillStr)

// 创建唯一id
wx.stringUtil.uuid(prefix = '')

// 创建类似订单
wx.stringUtil.orderedUuid(prefix = '')

// 解析URL
wx.stringUtil.parseUrl(url)

// 解析Url Query字符串
wx.stringUtil.parseUrlQuery(str)

// 组装url
wx.stringUtil.buildUrl(obj)

// 保留小数点
wx.numberUtil.toDecimal(number, dotNum = 2)

// 转换为人性化数字
wx.numberUtil.toSimplify(num, isLetter = false)

// 格式化日期
wx.timeUtil.format(formatStr = 'yyyy-MM-dd hh:mm:ss', date = new Date())

// 格式化成日期
wx.timeUtil.format.date(date = new Date())

// 格式化成时间
wx.timeUtil.format.time(date = new Date(), isSeconds = false)

// 格式化成日期时间
wx.timeUtil.format.datetime(date = new Date(), isSeconds = false)

// 获取今天的开始时间
wx.timeUtil.todayStart(date = new Date())

// 获取今天的结束时间
wx.timeUtil.todayEnd(date = new Date())

// 获取今天开始和结束的时间
wx.timeUtil.today(start = new Date(), end = new Date())
```

### 中间件

> common/config/middleware.js 中间件

```javascript
// 中间件配置
// 创建一个中间件 $.$middleware();
// 系统内置中间件列表 $.$middlewares
import bindUser from './bind-user';
import loadConfig from './load-config';

module.exports = {
	appLaunch: [
		bindUser,
		loadConfig
	],
	appShow: [
		bindUser
	],
	appHide: [],
	appRoute: [],
	appRouteDone: [],
	appUnhang: [],
};

```

### 混合器

> common/mixins/page.js 扩展page实例方法

```javascript
module.exports = {
	// 设置data值
	setValue: function(e) {
		this.setData(e.target.dataset);
	}
};
```

> common/mixins/component.js 扩展component实例方法

```javascript
module.exports = {};
```

### 组件概览

components/custom-auth-modal 【用户授权】

components/custom-card 【卡片】

components/custom-count-down 【倒计时】

components/custom-coupon 【优惠券】

components/custom-empty 【空状态】

components/custom-floating-button 【悬浮按钮】

components/custom-footer 【网站底部信息栏】

components/custom-forms 【表单】

components/custom-loading 【Loading】

components/custom-map 【地图】

components/custom-nav 【菜单导航】

components/custom-number-keyboard 【数字键盘】

components/custom-page 【页面】

components/custom-page-load 【页面加载中】

components/custom-page-load 【页面加载中】

components/ccustom-pic-group 【图片组】

components/custom-pk 【PK】

components/custom-poster 【海报】

components/custom-qrcode 【二维码】

components/custom-search 【搜索框】

components/custom-swiper 【轮播图】

components/custom-tab 【Tab】

components/custom-technical-support 【技术支持】

components/custom-titlebar 【标题栏】

components/custom-uploader 【上传器】

components/custom-verify-code 【验证码】
