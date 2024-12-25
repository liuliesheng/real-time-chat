import $ from '../../../bootstrap/$';
import {resolveHint, resolveModal} from './util';
import login from "./login";

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
		if (data.code !== 1) {

			// 登录失效
			if (data.code === -1) {
				return resolveLogin(response);
			} else if (data.code === -10) { // 暂无权限
				return resolveNotAuthError(response);
			}

			return resolveBasicError(response);
		}

		// 是否强制提示信息
		if (data.is_force_tips) {
			const method = res.is_force_tips === true ? 'modal' : res.is_force_tips;
			if (method === 'toast') {
				hint.hintSuccess(data.forceTipMsg || data.msg);
			} else {
				showModal({
					content: data.forceTipMsg || data.msg,
					showCancel: false
				});
			}
		}

		return config.returnRaw ? response : data;
	},
	rejected: function(err) {
		console.error('request system error:', err);

		if (err.config && !err.isCancel) {
			const hint = resolveHint(err.config);

			// 关闭loading
			if (err.config.loading) {
				err.config.loading.hideLoading();
			}

			if (err.config.isShowErrorTips !== false) {
				hint.hintError(err.errMsg || '网络错误，请稍后~');
			}
		}

		return Promise.reject(err);
	}
};


// 生成登录超时的错误
function resolveLoginTimeoutError(response) {
	console.error('apply for login:', response);

	$.showModal({
		content: '登录超时，请稍后再试~',
		showCancel: false
	});

	return Promise.reject({
		errMsg: '登录超时!',
		loginTimeout: true,
		response: response
	});
}

// 登录
function resolveLogin(response) {
	const config = response.config;

	if (config.loginCount === 1) {
		return resolveLoginTimeoutError();
	}

	config.loginCount = 1;

	return login(config).then(options => $.$http.request(options));
}

// 生成Http状态的错误
function resolveHttpStatusError(response) {
	const config = response.config;
	const data = response.data;
	const hint = resolveHint(config);

	if (config.isShowErrorTips !== false) {
		if (response.statusCode === 404) {
			hint.hintError(data.msg || '网络繁忙，请稍后~');
			if (config.method.toUpperCase() === 'GET') {
				$.navigateBack();
			}
		} else {
			hint.hintError('网络繁忙，请稍后~');
		}
	}

	console.error('http error:', response);
	return Promise.reject(response);
}

// 无权限
function resolveNotAuthError(response) {
	const config = response.config;
	resolveModal(config)({
		title: '温馨提示',
		content: '暂无权限，详细请查看权限说明？',
		showCancel: true,
		confirmColor: '#2E8B57',
		confirmText: '了解一下',
		success: (res) => {
			if (res.cancel) {
				return;
			}

			if ($.$config.notAuthPage) {
				$.navigateTo({
					url: $.$config.notAuthPage
				});
			}
		}
	});

	console.warn('not auth:', response);
	return Promise.reject(response);
}

// 其他错误处理
function resolveBasicError(response) {
	const config = response.config;
	const data = response.data;
	const hint = resolveHint(config);

	if (config.isShowErrorTips !== false) {
		if (data.show_msg_type === 1) {
			resolveModal(config)({
				content: data.msg || '网络繁忙，请稍后~',
				showCancel: false
			});
		} else {
			hint.hintError(data.msg || '网络繁忙，请稍后~');
		}
	}

	const logicCodeHandles = config.logicCodeHandles;
	if (logicCodeHandles && logicCodeHandles[data.code]) {
		logicCodeHandles[data.code](data, response);
	}

	console.debug('request logic tips:', response);
	return Promise.reject(response);
}
