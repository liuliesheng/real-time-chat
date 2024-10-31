import $ from '../bootstrap/$';

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

		const data = e.target.dataset;
		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				this[key] = e.target.dataset[key];
			}
		}
	}
};
