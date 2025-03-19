export default {
	name: 'app-bind-user',
	isBinded: false,
	handle: function(next, options) {
		if (options.query && options.query.share_uid) {
			console.log('检查到分享用户ID', options.query.share_uid);
			this.goHandle(options);
		} else {
			console.log('未检查到分享用户ID');
			const globalData = this.context.globalData;
			if (!globalData.userInfo) {
				login({
					loginUserInfo: false
				});
			}
		}

		next();
	},

	// 实际处理程序
	goHandle: function(options) {
		const shareUid = options.query.share_uid;
		const globalData = this.context.globalData;
		if (globalData.shareUid == shareUid && this.isBinded) {
			console.log('两次分享用户ID一致，不进行处理！', shareUid);
			return;
		} else {
			this.isBinded = false;
		}

		globalData.shareUid = shareUid;

		console.log("开始绑定");
		login({
			loginUserInfo: false
		}).then(() => {
			this.isBinded = true;
			console.log("绑定成功");
		});
	},
};
