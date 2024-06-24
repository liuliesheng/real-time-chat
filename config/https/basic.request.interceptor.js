export default function(res) {
	console.debug('request:', res);

	// 是否显示加载条
	// res.showLoading = true;
	if (res.showLoading) {
		const showLoadingText = typeof res.showLoading === 'string' ? res.showLoading : '请稍后...';
		wx.showLoading({
			title: showLoadingText,
			mask: true,
		});
	}

	// 附加用户session_id
	const globalData = getApp().globalData;
	if (!globalData.sessionId) {
		globalData.sessionId = wx.getStorageSync('session_id');
	}
	if (!res.data) res.data = {};
	res.data.session_id = globalData.sessionId;

	return res;
}
