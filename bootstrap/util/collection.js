/**
 * 随机打乱数组
 * @param {*[]} arr
 * @returns {*}
 */
export function shuffle(arr) {
	let m = arr.length,
		i;
	while (m) {
		i = (Math.random() * m--) >>> 0;
		[arr[m], arr[i]] = [arr[i], arr[m]]
	}
	return arr;
}

/**
 * 从 list中产生一个随机样本。传递一个数字表示从list中返回n个随机元素。否则将返回一个单一的随机项。
 * @param {array,object} arr
 * @param {number} n
 * @param guard
 * @return {*}
 */
export function sample(arr, n, guard) {
	if (n == null || guard) {
		if (!Array.isArray(arr)) arr = Array.from(arr);
		return arr[Math.random() * (arr.length - 1)];
	}
	return shuffle(arr).slice(0, Math.max(0, n));
}

// Internal implementation of a recursive `flatten` function.
const _flatten = function(input, shallow, strict, startIndex) {
	let output = [],
		idx = 0;
	let i = startIndex || 0,
		length = input && input.length;
	for (; i < length; i++) {
		let value = input[i];
		if (Array.isArray(value)) {
			//flatten current level of array or arguments object
			if (!shallow) value = _flatten(value, shallow, strict);
			let j = 0,
				len = value.length;
			output.length += len;
			while (j < len) {
				output[idx++] = value[j++];
			}
		} else if (!strict) {
			output[idx++] = value;
		}
	}
	return output;
};

/**
 * 将多维数组拉平
 * Flatten out an array, either recursively (by default), or just one level.
 * @param array
 * @param shallow
 * @return {Array}
 */
export function flatten(array, shallow) {
	return _flatten(array, shallow, false);
}

/**
 * 返回传入 arrays（数组）交集。结果中的每个值是存在于传入的每个arrays（数组）里。
 * @param {array} array...
 * @return {Array}
 */
export function intersection(array) {
	if (array == null) return [];

	const result = [];
	const argsLength = arguments.length;

	for (let i = 0; i < array.length; i++) {
		const item = array[i];
		if (result.indexOf(item) !== -1) continue;

		let j = 1;
		for (; j < argsLength; j++) {
			if (arguments[j].indexOf(item) === -1) break;
		}

		if (j === argsLength) result.push(item);
	}

	return result;
}

/**
 * 取两个数组的差集
 * Take the difference between one array and a number of other arrays.
 * Only the elements present in just the first array will remain.
 * @return {*}
 */
export function difference() {
	let rest = Array.from(arguments);
	const array = rest.shift();
	rest = _flatten(rest, true, true);
	return array.filter((value) => rest.indexOf(value) === -1);
}

/**
 * 它类似于map，但是这用于对象。转换每个属性的值。
 * @param {*} obj
 * @param {function(*,string,*)} iteratee
 */
export function mapObject(obj, iteratee) {
	const keys = Object.keys(obj),
		length = keys.length,
		results = {};
	let currentKey;
	for (let index = 0; index < length; index++) {
		currentKey = keys[index];
		results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	}
	return results;
}
/**
 * 返回数据中指定的一列
 * @param {*} arr
 * @param {string} columnKey
 * @param {string} indexKey
 * @return {*}
 */
export function column(arr, columnKey, indexKey) {
	const result = {};

	if (columnKey) {
		columnKey = columnKey.split(",");
	}
	
	arr.forEach(function(it, i) {
		let item = it;
		if (columnKey) {
			item = {};
			columnKey.forEach(function(ck) {
				item[ck] = it[ck];
			});
		}

		result[indexKey ? it[indexKey] : i] = item;
	});
	return result;
}
