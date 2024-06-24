// 收集formid
const FORMID_LIST = [];
wx.define('pushFormid', function(formid) {
	// if (wx.isDev) return;
	if (FORMID_LIST.length > 100) {
		FORMID_LIST.shift();
	}
	FORMID_LIST.push(formid);
});
wx.define('pullFormid', function(num = 1) {
	return FORMID_LIST.splice(0, num);
});

module.exports = {
	// 推送formid
	__pushFormid__: function(e) {
		if (!e.detail.formId) return;
		wx.pushFormid(e.detail.formId);
	},

	// 设置data值
	setValue: function(e) {
		if (e.detail && e.detail.formId) {
			wx.pushFormid(e.detail.formId);
		}
		this.setData(e.target.dataset);
	}
};
