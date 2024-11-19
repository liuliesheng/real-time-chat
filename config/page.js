import $ from '../bootstrap/$';

module.exports = {

	// 推送formid
	__pushFormid__: function(e) {
		if (!e.detail.formId) return;
		$.pushFormid(e.detail.formId);
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

	// 跳转
	linkTo: function(e) {
		const dataset = e.currentTarget.dataset;
		const method = dataset.type || "navigateTo";
		$[method]({
			url: dataset.url
		});
	}
};
