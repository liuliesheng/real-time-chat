console.groupCollapsed(`%c相关快捷操作`, "color:green;font-size:14px");
console.log(`%c
wx.define(key,value,isEnumerable) 把一个变量绑定到wx
wx.$define(obj,key,value,isEnumerable) 把一个变量绑定到某个对象上
wx.require(file, errorTips = true) 引入模块

wx.random(min, max) 随机数
wx.isEmpty(obj) 变量是否为空 空字符串 null undefined 空对象 空数组
wx.isArray(obj) 是否是数组
wx.isObject(obj) 是否是对象
wx.toObject(obj) 转换成对象
wx.assign(target,...) 深度合并对象
wx.collectionUtil 集合工具类
wx.numberUtil 数字工具类
wx.stringUtil 字符串工具类
wx.timeUtil 时间日期工具类
wx.functionUtil 函数工具类

wx.emitter 默认监听器实例
wx.EventEmitter 创建监听器
wx.publisher(name) 生成一个发布/订阅实例
wx.middleware(handles = []) 生成一个中间件实例

wx.http(options) 默认网络请求实例
wx.http.get(url, data, options) 发起GET网络请求
wx.http.post(url, data, options) 发起POST网络请求
wx.Http 网络请求类
wx.uploader(files) 生成一个上传文件实例

wx.runtimeConfig 运行时配置信息
wx.config 配置信息
wx.middlewares 中间件列表

`, "color:#00f;font-size:12px;");
// console.log("%c", "padding:70px 120px;line-height:200px;background-size:50px 50px;background:url('http://hbimg.b0.upaiyun.com/d57f34add1cdc182df3aab0777d0d88a1648073610e02-35Kp1Q_fw658') no-repeat;");
console.groupEnd();
