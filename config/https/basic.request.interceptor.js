export default function(config) {
	console.debug('request:', config);

	// 是否显示加载条
	// config.showLoading = true;
	if (config.showLoading) {
		const showLoadingText = typeof config.showLoading === 'string' ? config.showLoading : '请稍后...';
		uni.showLoading({
			title: showLoadingText,
			mask: true,
		});
	}

	// 初始化请求参数
	if (!config.data) config.data = {};

	// 附加用户session_id
	const globalData = getApp().globalData;
	if (!globalData.sessionId) {
		globalData.sessionId = uni.getStorageSync('session_id');
	}
	config.data.session_id = globalData.sessionId;

	return config;
}
