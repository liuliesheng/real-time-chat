# weapp-template & uni-app

#### 介绍
微信小程序模板：里面封装了一些常用的类库和方法，方便开发人员二次开发时能够快速搭建一个前端应用。
1. 用户授权（底层API优化，并和后端接入进行抽象，后端按照指定的要求处理程序即可）
2. 请求封装（日常开发中，最常用的无非就是网络请求和后端进行交互，借鉴Axios设计思想，对原始的Http进行封装处理）
3. 多文件上传（多文件上传，再也不不用写太多的代码了，内部目前支持：远程上传、七牛上传驱动，有兴趣的同学可以扩展OSS和COS上传驱动以满足开发中的需求）
4. 事件监听（多页面复杂数据传递，再也不用编写复杂的代码）
5. 中间件（小程序启动时要处理复杂的业务）
6. 发布/订阅者
7. 原生JS函数扩展等
8. 日期时间的转换
9. 数据验证（快速验证数据是否合法）

#### 软件架构
1. uni-app 作为底层依托可输出多端应用（微信小程序、支付宝小程序、App、H5等）
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
	│  │  ├─logins                          相关登录器存放目录
	│  │  │  ├─account.js                   普通账号密码登录器，适用于H5
	│  │  │  ├─basic.js                     小程序登录器
	│  │  │  └─...                         	其他
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

#### 安装教程

下载即用

#### 使用说明

在小程序 app.js 中引入 bootstrap/index.js 全局api,配置加载等等一切都可以运转起来了。

    // main.js
    import "./bootstrap/index";
	// 会自动注入到 `uni.$` 变量下
    
	// plugins/init.js
    uni.$.emitter.on('sys.getUserInfo.to', function() {
        uni.navigateTo({
            url: '/pages/user/auth/auth',
        });
    });
    
	// App.vue
    export default {
    	globalData: {
    		userInfo: null
    	},
	};

**网络请求：**

    // 发送一个网络请求
    wx.http.get(uri,data).then(()=>console.log,err=>console.error)
    
    // 上传文件
    wx.http({
        filePath:'',
        formData:{},
        name:'file'
    }).then(()=>console.log,err=>console.error)
    
**事件监听：**

    // 监听一个事件
    wx.emitter.on('choose.address', function(address) {
        console.log(address);
    });
    
    // 触发一个事件
    wx.emitter.emit('choose.address',{
        adddress:'郑州郑东新区...'
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
    
**数据验证：**

    //实例化模式，一般用于表单提交前的验证

    //验证规则，格式：字段名:[验证规则1,[带参数验证规则,参数]...]
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
    
**相关工具方法：**

    // 随机打乱数组
    wx.collectionUtil.shuffle(arr) 
    
    // 从 list中产生一个随机样本。传递一个数字表示从list中返回n个随机元素。否则将返回一个单一的随机项。
    wx.collectionUtil.sample = function(arr, n, guard)

    // 将多维数组拉平
    wx.collectionUtil.flatten(array, shallow)
    
    // 返回传入 arrays（数组）交集。结果中的每个值是存在于传入的每个arrays（数组）里。
    wx.collectionUtil.intersection(arr..)

    // 取两个数组的差集
    wx.collectionUtil.difference(arr...)
    
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

#### 相关配置
一些配置信息都放在config目录下，你可以在你的代码的任何地方使用 wx.config 获取config/app.js中的配置。

**common/config/app.js 项目配置**

    module.exports = {
    	stopPullDownRefreshAudio:'/audio/loadover.mp3', // 废弃
    	
        // 版本号
	    version: '1.0',
    	
        // 订阅消息模板ID
	    tmplIds: [],
    };

**common/config/http.js http基础配置**

    module.exports = {
        defaults: {
            // baseURL: 'http://127.0.0.1',
            baseURL: 'https://product.domin.com',

            // Login
            // #ifdef MP
            login: uni.$logins.basic, // 使用小程序登录器
            loginUrl: baseURL + '/weapp_login',
            // #endif
    
            // #ifdef H5
            login: uni.$logins.account, // 使用默认账号密码登录器
            loginUrl: baseURL + '/login',
            // #endif
    
            // basic login uses
            loginDenyAuthMsg: '此操作需要您先授权！',
            loginFailedMsg: '登录失败，请稍后再试~',
            loginUserInfo: false,
    
            // account login uses
            loginPage: '/pages/auth/login',
    
            // 登录成功后的回调
            onLogged: function() {
    
            }
        },
        
        requestInterceptors: [
            ... 请求拦截器
        ],
        
        responseInterceptors: [
           ... 响应拦截器
        ]
    };

**common/config/middleware.js 中间件**

    import testAppIsStart from './middlewares/test-app-is-start'
    import printParams from './middlewares/print-params'
    
    module.exports = {
    	appLaunch: [
    		testAppIsStart,
    	],
    	appShow: [
    		printParams
    	],
    	appHide: [],
    	appRoute: [],
    	appRouteDone: [],
    	appUnhang: [],
    };

**common/config/page.js 扩展page实例方法**

    module.exports = {
    	// 设置data值
    	setValue: function(e) {
    		this.setData(e.target.dataset);
    	}
    };
