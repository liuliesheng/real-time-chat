import {
    httpRequest,
    uploadFile
} from './sys-adapter.js';
/**
 * 是否是绝对url
 * @param {string} url
 * @returns {boolean}
 */
function isAbsolute(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d+-.]*:)?\/\//i.test(url);
}

/**
 * 组合url
 * @param {string} baseURL
 * @param {string} relativeURL
 * @returns {string}
 */
function combine(baseURL, relativeURL) {
    return relativeURL ?
        baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') :
        baseURL;
}

/**
 * 普通请求适配器
 * @param options
 * @return {Promise}
 */
function requestAdapter(options) {
    return new Promise((resolve, reject) => {
        httpRequest(Object.assign({}, options, {
            success: (res) => {
                res.config = options;
                resolve(res);
            },
            fail: () => {
                reject(err);
            },
            complete: undefined
        }));
    });
}

/**
 * 文件上传请求适配器
 * @param options
 * @return {Promise}
 */
function uploadAdapter(options) {
    return new Promise((resolve, reject) => {
        const uploadTask = uploadFile(Object.assign({}, options, {
            success: (res) => {
                res.config = options;
                resolve(res);
            },
            fail: (err) => {
                reject(new HttpException(500, err.errMsg, options, err));
            },
            complete: undefined
        }));
        uploadTask.onProgressUpdate(options.onProgressUpdate);
    });
}

/**
 * 请求器
 * @param options
 * @return {Promise}
 */
export default function request(options) {
    options = Object.assign({}, request.defaults, options);
    // Support baseURL config
    if (options.baseURL && !isAbsolute(options.url)) {
        options.url = combine(options.baseURL, options.url);
    }

    let adapter = null;
    if (options.filePath || options.isUpload) {
        adapter = uploadAdapter;
    } else {
        adapter = requestAdapter;
    }
    const chain = [].concat(interceptors.request, [{
        fulfilled: adapter,
        rejected: null
    }], interceptors.response);

    let promise = Promise.resolve(options);
    chain.forEach(interceptor => promise = promise.then(interceptor.fulfilled, interceptor.rejected));

    return promise;
}

//注册快捷方法
['get', 'post', 'put', 'delete'].forEach(method => {
    request[method] = function(url, data, options) {
        return request(Object.assign(options || {}, {
            url: url,
            method: method,
            data: data
        }));
    };
});

/**
 * 执行请求所有
 * @param {Promise[]} requests
 * @return {Promise}
 */
request.all = function(requests) {
    return Promise.all(requests);
};

//默认配置
request.defaults = {};

//拦截器
const interceptors = {
    request: [],
    response: []
};

/**
 * 添加请求拦截器
 * @param {function} [fulfilled]
 * @param {function} [rejected]
 * @return {number}
 */
request.addRequestInterceptor = function(fulfilled, rejected) {
    return interceptors.request.push({
        fulfilled: fulfilled,
        rejected: rejected
    }) - 1;
};

/**
 * 移除拦截器
 * @param {number} number
 */
request.removeRequestInterceptor = function(number) {
    interceptors.request.splice(number, 0);
};

/**
 * 添加服务器结果拦截器
 * @param {function} [fulfilled]
 * @param {function} [rejected]
 * @return {number}
 */
request.addResponseInterceptor = function(fulfilled, rejected) {
    return interceptors.response.push({
        fulfilled: fulfilled,
        rejected: rejected
    }) - 1;
};

/**
 * 移除拦截器
 * @param {number} number
 */
request.removeResponseInterceptor = function(number) {
    interceptors.response.splice(number, 0);
};