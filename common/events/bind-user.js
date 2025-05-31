export default {
	handle: function(options) {
		this.initFenxiaoUid(options);

		if (options.query && options.query.share_uid) {
			console.info('检查到分享用户ID', options.query.share_uid);
			this.goHandle(options);
		} else {
			console.info('未检查到分享用户ID');
		}
	},

	// 初始化分销UID
	initFenxiaoUid: function(options) {
		const globalData = getApp().globalData;

		let fenxiaoUid = parseInt(uni.getStorageSync('fenxiao_uid'));
		if (options.query.fenxiao_uid) {
			fenxiaoUid = parseInt(options.query.fenxiao_uid) || fenxiaoUid;
			
			if (fenxiaoUid) {
				uni.setStorageSync('fenxiao_uid', fenxiaoUid);
			}
		}

		globalData.fenxiaoUid = fenxiaoUid;
	},

	// 实际处理程序
	goHandle: function(options) {
		const shareUid = parseInt(options.query.share_uid) || 0;
		const globalData = getApp().globalData;
		if (globalData.shareUid === shareUid && this.isBinded) {
			console.info('两次分享用户ID一致，不进行处理！', shareUid);
			return;
		} else {
			this.isBinded = false;
		}

		globalData.shareUid = shareUid;

		console.info("开始绑定分享用户...");
		$.$login({
			loginUserInfo: false
		}).then(() => {
			this.isBinded = true;
			console.info("绑定分享用户成功");
		}, () => {
			console.error("绑定分享用户失败");
		});
	},
};
