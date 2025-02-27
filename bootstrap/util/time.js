/**
 * 处理iOS不认识2020-12-12，需要转换为2020/12/12
 * @param {Date|String|Number} time
 * @return {Date}
 */
export function getDate(time) {
	if (time instanceof Date) {
		return time
	}

	switch (typeof time) {
		case 'string':
			return new Date(time.replace(/-/g, '/'));
		default:
			return new Date(time.toString().length === 10 ? time * 1000 : time);
	}
}

/**
 * 格式化日期
 * @param {string} formatStr
 * @param {Date|String|Number} [date]
 * @return {string}
 */
export function format(formatStr = 'yyyy-MM-dd hh:mm:ss', date = new Date()) {
	date = getDate(date);

	const o = {
		"M+": date.getMonth() + 1, //月份
		"d+": date.getDate(), //日
		"h+": date.getHours(), //小时
		"m+": date.getMinutes(), //分
		"s+": date.getSeconds(), //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds() //毫秒
	};

	if (/(y+)/.test(formatStr)) {
		formatStr = formatStr.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for (const k in o) {
		if (new RegExp("(" + k + ")").test(formatStr)) {
			formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[
				k]).length)));
		}
	}

	return formatStr;
}

/**
 * 格式化成年
 * @param {Date|String|Number} date
 * @return {string}
 */
format.year = function(date = new Date()) {
	return format('yyyy', date);
}

/**
 * 格式化成日期
 * @param {Date|String|Number} date
 * @return {string}
 */
format.date = function(date = new Date()) {
	return format('yyyy-MM-dd', date);
}

/**
 * 格式化成时间
 * @param {Date|String|Number} date
 * @param {Boolean} isSeconds
 * @return {string}
 */
format.time = function(date = new Date(), isSeconds = false) {
	return format('h:i' + (isSeconds ? ':s' : ''), date);
}

/**
 * 格式化成日期时间
 * @param {Date|String|Number} date
 * @param {Boolean} isSeconds
 * @return {string}
 */
format.datetime = function(date = new Date(), isSeconds = false) {
	return format('yyyy-MM-dd hh:mm' + (isSeconds ? ':ss' : ''), date);
}

/**
 * 获取今天的开始时间
 * @param {Date|String|Number} date
 * @return {number}
 */
export function todayStart(date = new Date()) {
	date = getDate(date);

	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);

	return date.getTime();
}

/**
 * 获取今天的结束时间
 * @param {Date|String|Number} date
 * @return {number}
 */
export function todayEnd(date = new Date()) {
	date = getDate(date);

	date.setHours(23);
	date.setMinutes(59);
	date.setSeconds(59);
	date.setMilliseconds(0);

	return date.getTime();
}

/**
 * 获取今天开始和结束的时间
 * @param {Date|String|Number} start
 * @param {Date|String|Number} end
 * @return {{start: number, end: number}}
 */
export function today(start = new Date(), end = new Date()) {
	return {
		start: todayStart(start),
		end: todayEnd(end)
	};
}

/**
 * 获取相对时间
 * @param {Date|String|Number} time
 * @param {Date|String|Number} now
 */
export function fromNow(time, now = new Date()) {
	const threshold = [10000, 86400000];

	const date = getDate(time);
	now = getDate(now);
	let ms = date.getTime() - now.getTime();
	let absMs = Math.abs(ms);
	if (absMs < threshold[0]) {
		return ms < 0 ? '刚刚' : '马上';
	}

	if (absMs >= threshold[1]) {
		return format.datetime(date);
	}

	let num;
	let unit;
	let suffix = '后';
	if (ms < 0) {
		suffix = '前';
		ms = -ms;
	}
	const seconds = Math.floor((ms) / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);
	const years = Math.floor(months / 12);
	switch (true) {
		case years > 0:
			num = years;
			unit = '年';
			break
		case months > 0:
			num = months;
			unit = '月';
			break
		case days > 0:
			num = days;
			unit = '天';
			break
		case hours > 0:
			num = hours;
			unit = '小时';
			break
		case minutes > 0:
			num = minutes;
			unit = '分钟';
			break
		default:
			num = seconds;
			unit = '秒';
			break
	}

	return '{num}{unit}{suffix}'.replace(/{\s*num\s*}/g, num + '')
		.replace(/{\s*unit\s*}/g, unit)
		.replace(/{\s*suffix\s*}/g, suffix);
}
