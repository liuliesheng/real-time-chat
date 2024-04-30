/**
 * 生成随机数
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function random(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 是否为空
 * @param {*} obj
 * Is a given array, string, or object empty?
 * An "empty" object has no enumerable own-properties.
 * @return {boolean}
 */
export function isEmpty(obj) {
	if (obj == null) return true;

	if (isArray(obj) || typeof obj === 'string' || obj.callee) return obj.length === 0;

	return Object.keys(obj).length === 0;
}

/**
 * 是否是数组
 * @param obj
 * @return {boolean}
 */
export function isArray(obj) {
	if (typeof obj !== 'object') return false;
	return obj.length !== undefined;
}


/**
 * 是否是对象
 * @param {*} o
 * @return {boolean}
 */
export function isObject(o) {
	const type = typeof o;
	return o !== null && (type === "object" || type === "function");
}

/**
 * 转换成Object
 * @param {*} val
 * @return {*}
 */
export function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError("Cannot convert undefined or null to object");
	}
	return Object(val);
}


const hasOwnProperty = Object.prototype.hasOwnProperty;
const propIsEnumerable = Object.prototype.propertyIsEnumerable;

function assignKey(to, from, key) {
	const val = from[key];
	if (val === undefined || val === null) {
		return;
	}
	if (hasOwnProperty.call(to, key)) {
		if (to[key] === undefined || to[key] === null) {
			throw new TypeError("Cannot convert undefined or null to object (" + key + ")");
		}
	}
	if (!hasOwnProperty.call(to, key) || !isObject(val)) {
		to[key] = val;
	} else {
		to[key] = _assign(Object(to[key]), from[key]);
	}
}

function _assign(to, from) {
	if (to === from) {
		return to;
	}

	from = Object(from);
	for (const key in from) {
		if (hasOwnProperty.call(from, key)) {
			assignKey(to, from, key);
		}
	}

	if (Object.getOwnPropertySymbols) {
		const symbols = Object.getOwnPropertySymbols(from);
		for (let i = 0; i < symbols.length; i++) {
			if (propIsEnumerable.call(from, symbols[i])) {
				assignKey(to, from, symbols[i]);
			}
		}
	}

	return to;
}

//深度合并对象
export function assign(target) {
	target = toObject(target);
	for (let s = 1; s < arguments.length; s++) {
		_assign(target, arguments[s]);
	}
	return target;
}
