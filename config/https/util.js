import $ from '../../bootstrap/$';

/**
 * 附加Get请求参数
 * @param config
 * @param attachData
 */
export function attachGetParams(config, attachData) {
	const method = (config.method || 'GET').toLocaleUpperCase();

	if ('GET' === method || 'DELETE' === method) {
		Object.assign(config.data, attachData);
	} else {
		const queryString = makeQueryString(attachData);
		config.url = config.url + (config.url.indexOf('?') !== -1 ? '&' : '?') +
			queryString;
	}
}

/**
 * 生成基本Get请求参数
 * @returns {{access_id: string, version: string | string | number, timestamp: number}}
 */
export function makeBasicGetParams() {
	return {
		// 附加版本号
		version: $.$config.version,
		// 时间戳
		timestamp: Math.floor(new Date().getTime() / 1000)
	};
}


// 生成QueryString
function makeQueryString(queryObject) {
	return Object.entries(queryObject).reduce((result, entry) => {
		if (entry[1]) {
			entry[1] = encodeURIComponent(entry[1]);
		}

		result.push(entry.join('='));
		return result
	}, []).join('&');
}

const hint = {
	hintError: $.$hintError,
	hintSuccess: $.$hintSuccess,
};

/**
 * 显示提示信息
 * @param config
 * @return {{hintError, hintSuccess}}
 */
export function resolveHint(config) {
	if (!config) {
		return hint;
	}

	return config.hint || hint;
}

const showModal = function(options) {

};

/**
 * 显示模态框
 * @param config
 * @return {function}
 */
export function resolveModal(config) {
	if (!config) {
		return showModal;
	}

	return config.modal || showModal;
}
