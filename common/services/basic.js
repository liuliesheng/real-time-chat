const $ = uni;

export default {
	shareUrl(url) {
		const app = getApp();
		const jumpParams = [];

		const user = uni.$user.value();
		if (user) {
			const shareUid = parseInt(uni.$user.get('id')) || 0;
			jumpParams.push(`share_uid=${shareUid}`);
		}

		const fenxiaoUid = parseInt(app.globalData.fenxiaoUid) || 0;
		jumpParams.push(`fenxiao_uid=${fenxiaoUid}`);

		return url + (url.indexOf('?') === -1 ? '?' : '&') + jumpParams.join('&');
	}
};
