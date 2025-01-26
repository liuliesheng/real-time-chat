import $ from "../../../bootstrap/$";

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

	// 跳转
	navTo: function(url) {
		uni.navigateTo({
			url: url,
			fail() {
				uni.switchTab({
					url: url
				});
			}
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
		let current = e.target.dataset.current;
		let urls = e.currentTarget.dataset.urls;
		if (current === undefined) {
			return;
		}

		if (typeof urls == 'string') {
			urls = urls.split(',');
		}

		let index = parseInt(current);
		if (!isNaN(index)) {
			current = urls[index];
		}

		wx.previewImage({
			current: current, // 当前显示图片的http链接
			urls: urls, // 需要预览的图片http链接列表
			showmenu: true,
		})
	},

	// 图片懒加载函数处理
	imageOnLoad: function(data) {
		// if (!this.images) {
		// 	this.$set(this, 'images', {
		// 		defalut: {}
		// 	});
		// }

		// if (!this.images[target]) {
		// 	this.$set(this.images, target, {});
		// }

		setTimeout(() => {
			// this.$set(this.images[target], id, true);
			this.$set(data, 'loaded', true);
		}, 100)
	},

	// 事件停止向上传递
	stopPrevent: function() {},

	// 复制订单号
	copy: function(text) {
		uni.setClipboardData({
			data: text
		});
		this.hintSuccess && this.hintSuccess('已复制');
	}
};
