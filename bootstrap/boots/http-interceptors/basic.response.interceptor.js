import $ from '../../../bootstrap/$';
import {resolveHint, resolveModal} from './util';

export default {
	fulfilled: function(response) {
		const {config, data} = response;

		const hint = resolveHint(config);
		const showModal = resolveModal(config);

		// 关闭loading
		if (config.loading) {
			config.loading.hideLoading();
		}

		// 显示500错误
		if (response.statusCode !== 200) {
			return resolveHttpStatusError(response);
		}

		// 业务错误提示
		if (data.code !== $.$http.config.successCode) {
			if (data.code === $.$http.config.loginInvalidCode) { // 登录失效
				return resolveLogin(response);
			} else if (data.code === $.$http.config.unauthorizedCode) { // 暂无权限
				return resolveUnauthorizedError(response);
			}
			return resolveBasicError(response);
		}

		// 是否强制提示信息
		if (data.is_force_tips || config.successTips) {
			const tipType = data.is_force_tips === true ? 'modal' : data.is_force_tips;
			if (tipType === 'modal') {
				showModal({
					isSuccess: true,
					isError: false,
					content: data.force_tips_msg || data.msg,
					showCancel: false
				});
			} else {
				hint.hintSuccess(data.force_tips_msg || data.msg);
			}
		}

		$.$http.config.onSuccess(data, response);

		return config.returnRaw ? response : data.data;
	},
	rejected: function(err) {
		console.error('request system error:', err);

		if (err.config && !err.isCancel) {
			const config = err.config;
			const hint = resolveHint(config);

			// 关闭loading
			if (config.loading) {
				config.loading.hideLoading();
			}

			if (config.isShowErrorTips !== false) {
				hint.hintError(err.errMsg || $.$http.config.errorTips);
			}
		}

		return Promise.reject(err);
	}
};

// 解析Http状态的错误
function resolveHttpStatusError(response) {
	console.error('http error:', response);

	const config = response.config;
	const statusCode = response.statusCode.toString();
	const data = response.data;

	if (config.isShowErrorTips !== false) {
		const hint = resolveHint(config);
		hint.hintError(data.msg || $.$http.config.errorTips);
	}

	const statusErrors = config.statusErrors;
	const globalStatusErrors = $.$http.config.logicErrors;
	if(statusErrors && statusErrors[statusCode]){
		statusErrors[statusCode](config, response);
	}else if (globalStatusErrors[statusCode]) {
		globalStatusErrors[statusCode](config, response);
	}

	return Promise.reject(response);
}

// 解析登录业务操作
function resolveLogin(response) {
	const config = response.config;

	if (config.loginCount >= $.$http.config.loginMaxCount) {
		console.error('login timeout:', response);

		$.$http.config.onLoginTimout(config, response);

		return Promise.reject({
			loginTimeout: true,
			errMsg: '登录超时!',
			response: response
		});
	}

	config.loginCount = (config.loginCount || 0) + 1;

	return $.$login(config).then(options => $.$http.request(options));
}

// 解析无权限错误
function resolveUnauthorizedError(response) {
	const config = response.config;

	$.$http.config.onUnauthorized(config, response);

	console.warn('not auth:', response);
	return Promise.reject(response);
}

// 解析其他业务错误操作
function resolveBasicError(response) {
	const config = response.config;
	const data = response.data;

	if (config.isShowErrorTips !== false) {
		const hint = resolveHint(config);

		if (data.show_msg_type === 1) {
			resolveModal(config)({
				isSuccess: false,
				isError: true,
				content: data.msg || $.$http.config.errorTips,
				showCancel: false
			});
		} else {
			hint.hintError(data.msg || $.$http.config.errorTips);
		}
	}

	const logicCode = data.code;
	const logicErrors = config.logicErrors;
	const globalLogicErrors = $.$http.config.logicErrors;
	if (logicErrors && logicErrors[logicCode]) {
		logicErrors[logicCode](data, response);
	} else if (globalLogicErrors[logicCode]) {
		globalLogicErrors[logicCode](data, response);
	}

	// console.warn('request logic tips:', response);

	return Promise.reject(response);
}
