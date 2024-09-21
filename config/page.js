const $ = uni.$;
module.exports = {
	// 推送formid
	__pushFormid__: function(e) {
		if (!e.detail.formId) return;
		$.pushFormid(e.detail.formId);
	},

	// 设置data值
	setValue: function(e) {
		if (e.detail && e.detail.formId) {
			$.pushFormid(e.detail.formId);
		}

		for (const key in e.target.dataset) {
			this[key] = e.target.dataset[key];
		}
	}
};
