export default {
	handle: function({ app, options }) {
		this.initDistributorId(app, options);

		if (options.query && options.query.share_uid) {
			console.info('检查到分享用户ID', options.query.share_uid);
			this.goHandle(app, options);
		} else {
			console.info('未检查到分享用户ID');
		}
	},

	// 初始化分销UID
	initDistributorId: function(app, options) {
		const globalData = app.globalData;

		let distributorId = parseInt(uni.getStorageSync('distributor_id'));
		if (options.query.distributor_id) {
			distributorId = parseInt(options.query.distributor_id) || distributorId;

			if (distributorId) {
				uni.setStorageSync('distributor_id', distributorId);
			}
		}

		globalData.distributorId = distributorId;
	},

	// 实际处理程序
	goHandle: function(app, options) {
		const globalData = options.app.globalData;

		const shareUid = parseInt(options.query.share_uid) || 0;
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
