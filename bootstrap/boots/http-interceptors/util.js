import $ from '../../../bootstrap/$';

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

	if (config.hint && typeof config.hint === 'object') {
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
