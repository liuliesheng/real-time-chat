// 绑定到一个只读变量到对象
export function define(obj, key, value, isEnumerable = true) {
    Object.defineProperty(obj, key, {
        enumerable: isEnumerable,
        get: function() {
            return value;
        }
    });
}

// 检测运行环境名称
export const env = (function() {
    if (typeof wx !== 'undefined') return 'wx';
    if (typeof my !== 'undefined') return 'my';
    if (typeof swan !== 'undefined') return 'swan';
    throw new Error('未知的运行环境，请再此处添加全局环境');
})();

// 检测全局运行环境
export const $ = (function() {
    if (typeof wx !== 'undefined') return wx;
    if (typeof my !== 'undefined') return my;
    if (typeof swan !== 'undefined') return swan;
    throw new Error('未知的运行环境，请再此处添加全局环境');
})();

// 获取运行环境配置
export const runtimeConfig = (function() {
    if (typeof __wxConfig !== 'undefined') return __wxConfig;
    return {};
})();

// 获取网络请求器
export const httpRequest = (function() {
    if ($.request) return $.request;
    if ($.httpRequest) return $.httpRequest;
    throw new Error('此运行环境不支持网络请求');
})();

// 获取文件上传器
export const uploadFile = (function() {
    if ($.uploadFile) {
        if (env === 'my') {
            return function(options) {
                if (options) {
                    options.fileName = options.name;
                    options.fileType = 'image';
                }
                return $.uploadFile(options);
            };
        } else {
            return $.uploadFile;
        }
    }
    throw new Error('此运行环境不支持文件上传');
})();