Page({
	onLoad: function() {
		wx.sys.getUserInfo().then(console.log);

		const data = [];
		for (let i = 0; i < 1000000; i++) {
			data.push({
				id: i,
				title: '来了，老弟！！！',
				content: '百壶载酒游凌云，醉中挥袖别故人。\n' +
					'依依向我不忍别，谁似峨嵋半轮月？\n' +
					'月窥船窗挂凄冷，欲到渝州酒初醒。\n' +
					'江空袅袅钓丝风，人静翩翩葛巾影。\n' +
					'哦诗不睡月满船，清寒入骨我欲仙。\n' +
					'人间更漏不到处，时有沙禽背船去。'
			});
		}

		const result = wx.arr2obj('data', data);
		this.setData(result);
	},
});
