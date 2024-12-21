import $ from "../../bootstrap/$";

export default {
	// 跳转
	linkTo: function(e) {
		const dataset = (e.detail.target || e.currentTarget || e.target).dataset;
		// const dataset = e.currentTarget.dataset;
		const url = dataset.url;
		const method = dataset.type || "navigateTo";
		$[method]({
			url: url
		});
	},

	// 绑定数据被改变
	setValueChange: function(e) {
		const dataset = e.currentTarget.dataset;
		const value = e.detail.value;
		const key = "$" + dataset.key;

		if (this.setData) {
			this.setData({
				[key]: value
			})
		} else {
			this[key] = value;
		}
	},

	// 设置data值
	setValue: function(e) {
		if (e.detail && e.detail.formId) {
			$.pushFormid(e.detail.formId);
		}

		const data = e.target.dataset;
		if (this.setData) {
			this.setData(data);
		} else {
			for (const key in data) {
				if (data.hasOwnProperty(key)) {
					this[key] = e.target.dataset[key];
				}
			}
		}
	},

	// 图片预览
	previewImage: function(e) {
		let current = e.currentTarget.dataset.current;
		let urls = e.currentTarget.dataset.urls;
		if (typeof urls == 'string') {
			const ceil = [];
			ceil.push(urls);
			urls = ceil;
		}
		wx.previewImage({
			current: current, // 当前显示图片的http链接
			urls: urls // 需要预览的图片http链接列表
		})
	},
};
