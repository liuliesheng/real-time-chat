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

	const basicParams = makeBasicGetParams();

	const method = (config.method || 'GET').toLocaleUpperCase();
	if ('GET' === method) {
		basicParams.sign = makeSign({
			access_id: $.$config.accessId,
			timestamp: basicParams.timestamp
		}, $.$config.accessKey);
		Object.assign(config.data, basicParams);
	} else {
		basicParams.sign = makeSign(config.data);
		const queryString = makeQueryString(basicParams);
		config.url = config.url + (config.url.indexOf('?') !== -1 ? '&' : '?') + queryString;
	}

	return config;
}

/**
 * 生成基本Get请求参数
 * @returns {{access_id: string, version: string | string | number, timestamp: number}}
 */
function makeBasicGetParams() {
	return {
		// 附加版本号
		version: $.$config.version,

		// access_id
		access_id: $.$config.accessId,

		// sign type
		sign_type: $.$config.signType,

		// session id
		session_id: $.$getSessionId(),

		// 时间戳
		timestamp: Math.floor(new Date().getTime() / 1000),
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

// 生成签名数据
function makeSign(data, key) {
	data = $.$collectionUtil.objectSort(data);
	const queryString = $.$stringUtil.buildUrl(data);
	return $.$md5(queryString + $.$config.accessKey);
}
