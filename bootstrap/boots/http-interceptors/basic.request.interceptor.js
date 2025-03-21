import $ from '../../../bootstrap/$';
import { resolveLoading } from "./util";

export default function(config) {
	const needTips = ['post', 'put'].indexOf(config.method) !== -1;

	// 自动判断成功时是否需要提示
	if (config.successTips === undefined) {
		config.successTips = needTips;
	}

	// 是否显示加载条
	config.loading = config.loading === undefined ? needTips : config.loading;
	if (config.loading) {
		const loadingText = typeof config.loading === 'string' ?
			config.loading : (config.loadingText || $.$http.config.loadingText);

		config.loading = resolveLoading(config);
		config.loading.showLoading({
			title: loadingText,
			mask: true,
		});
	}

	// 初始化请求参数
	if (!config.data) {
		config.data = {};
	}

	// 附加用户session_id
	const globalData = getApp().globalData;
	if (!globalData.sessionId) {
		globalData.sessionId = $.getStorageSync('session_id');
	}

	const basicParams = makeBasicGetParams();
	basicParams.session_id = globalData.sessionId;
	attachGetParams(config, basicParams);

	return config;
}


/**
 * 附加Get请求参数
 * @param config
 * @param attachData
 */
function attachGetParams(config, attachData) {
	const method = (config.method || 'GET').toLocaleUpperCase();

	if ('GET' === method || 'DELETE' === method) {
		Object.assign(config.data, attachData);
	} else {
		const queryString = makeQueryString(attachData);
		config.url = config.url + (config.url.indexOf('?') !== -1 ? '&' : '?') + queryString;
	}
}

/**
 * 生成基本Get请求参数
 * @returns {{access_id: string, version: string | string | number, timestamp: number}}
 */
function makeBasicGetParams() {
	return {
		// access_id
		access_id: $.$config.access_id,
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
