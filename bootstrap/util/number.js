/**
 * 数字工具类
 */
const _ = {};

export default _;

/**
 * 保留小数点
 * @param {*} number
 * @param {number} dotNum
 * @return {string}
 */
_.toDecimal = (number, dotNum = 2) => {
	if (typeof number !== 'string') number = number.toString();
	const dotIndex = number.indexOf('.');
	if (dotIndex !== -1) {
		number = number.substring(0, dotIndex + dotNum + 1);
	}
	return number;
};

/**
 * 转换为人性化数字
 * @param {number} num
 * @param {boolean} isLetter
 */
_.toSimplify = (num, isLetter = false) => {
	if (isNaN(num)) return num;
	const numHandler = function(num, unit = '') {
		if (String(num).indexOf('.') !== -1) {
			num = parseFloat(num.toFixed(2));
		}
		return num.toString() + unit;
	};

	const units = isLetter ? ['k', 'w', 'e', 'we', 'e*'] : ['千', '万', '亿', '万亿', '亿*'];
	if (num < 1000) return numHandler(num);
	if (num < 10000) return numHandler(num / 1000, units[0]);

	for (let i = 1; i < units.length; i++) {
		num /= 10000;
		if (num < 10000) return numHandler(num, units[i]);
	}
	return numHandler(num, units[units.length - 1]);
};
