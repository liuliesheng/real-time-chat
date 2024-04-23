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

	if (_.isArray(obj) || typeof obj === 'string' || obj.callee) return obj.length === 0;

	return Object.keys(obj).length === 0;
}
