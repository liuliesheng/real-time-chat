import $ from '../../../bootstrap/$';

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

// Loading
export const loading = {
	showLoading: $.showLoading,
	hideLoading: $.hideLoading
}

/**
 * 显示Loading
 * @param config
 * @return {{hintError, hintSuccess}}
 */
export function resolveLoading(config) {
	if (!config) {
		return loading;
	}

	if (config.loading && typeof config.loading === 'object') {
		return config.loading = {
			showLoading: config.loading.showLoading,
			hideLoading: config.loading.hideLoading
		};
	}

	return loading;
}

// Hint
export const hint = {
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

	if (config.hint && typeof config.loading === 'object') {
		return config.hint = {
			hintError: config.hint.hintError,
			hintSuccess: config.hint.hintSuccess
		};
	}

	return hint;
}

// Modal
export const showModal = $.showModal;

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
