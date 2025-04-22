import { random } from "./core";

/**
 * 左填充
 * @param {string} str
 * @param {Number} num
 * @param {string} fillStr
 * @return {string}
 */
export function leftFill(str, num, fillStr) {
	let fillStrList = [];
	for (let i = 0; i < num; i++) {
		fillStrList.push(fillStr);
	}
	return fillStrList.join() + str;
}

/**
 * 右填充
 * @param {string} str
 * @param {Number} num
 * @param {string} fillStr
 * @return {string}
 */
export function rightFill(str, num, fillStr) {
	let fillStrList = [];
	for (let i = 0; i < num; i++) {
		fillStrList.push(fillStr);
	}
	return str + fillStrList.join();
}

/**
 * 创建唯一id
 * @param {string} [prefix]
 * @return {string}
 */
export function uuid(prefix = '') {
	const k1 = random(100, 999);
	const k2 = new Date().getTime().toString().substring(10);
	const k3 = random(100, 999);
	return prefix + k1 + k2 + k3;
}

/**
 * 创建类似订单
 * @param {string} [prefix]
 * @return {string}
 */
export function orderedUuid(prefix = '') {
	const date = new Date();
	const timer = date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes() + date
		.getSeconds() + date.getMilliseconds();
	return prefix + timer + random(100000, 999999);
}

/**
 * 解析URL
 * @param  {string} url 被解析的URL
 * @return {object}     解析后的数据
 */
export function parseUrl(url) {
	const parse = url.match(
		/^(?:([a-z]+):\/\/)?([\w-]+(?:\.[\w-]+)+)?(?::(\d+))?([\w-\/.]+)?(?:\?((?:\w+=[^#&=\/]*)?(?:&\w+=[^#&=\/]*)*))?(?:#([\w-]+))?$/i
		);
	if (!parse) throw new Error("url格式不正确！");
	return {
		scheme: parse[1],
		host: parse[2],
		port: parse[3],
		path: parse[4],
		query: parse[5],
		fragment: parse[6]
	};
}

/**
 * 解析Url Query字符串
 * @param {string} str
 * @returns {{}}
 */
export function parseUrlQuery(str) {
	if (!str) return {};
	let value = str.split("&"),
		vars = {},
		param;
	for (const val in value) {
		param = value[val].split("=");
		vars[param[0]] = param[1];
	}
	return vars;
}

/**
 * 组装url
 * @param {*} obj
 * @return {string}
 */
export function buildUrl(obj) {
	const result = [];

	const keys = Object.keys(obj);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const value = typeof obj[key] === 'object' ? JSON.stringify(obj[key]) : obj[key];
		result.push(key + "=" + encodeURIComponent(value));
	}

	return result.join('&');
}
