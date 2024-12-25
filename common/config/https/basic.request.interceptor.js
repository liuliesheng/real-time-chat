import $ from '../../../bootstrap/$';
import { attachGetParams, resolveLoading, makeBasicGetParams } from "./util";

export default function(config) {
	// 是否显示加载条
	// config.loading = true;
	if (config.loading) {
		const loadingText = typeof config.loading === 'string' ? config.loading : (config.loadingText || '请稍后...');

		config.loading = resolveLoading(config);
		config.loading.showLoading({
			title: loadingText,
			mask: true,
		});
	}

	// 初始化请求参数
	if (!config.data) config.data = {};

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
