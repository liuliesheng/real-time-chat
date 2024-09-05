// 收集formid
const FORMID_LIST = [];
uni.define('pushFormid', function(formid) {
	// if (uni.isDev) return;
	if (FORMID_LIST.length > 100) {
		FORMID_LIST.shift();
	}
	FORMID_LIST.push(formid);
});
uni.define('pullFormid', function(num = 1) {
	return FORMID_LIST.splice(0, num);
});

module.exports = {
	// 推送formid
	__pushFormid__: function(e) {
		if (!e.detail.formId) return;
		uni.pushFormid(e.detail.formId);
	},

	// 设置data值
	setValue: function(e) {
		if (e.detail && e.detail.formId) {
			uni.pushFormid(e.detail.formId);
		}
		this.setData(e.target.dataset);
	}
};
