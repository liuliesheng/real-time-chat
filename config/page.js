import basic from './mixins/basic';

module.exports = {
	...basic,

	// 页面完成
	finish: function(result) {
		const pages = getCurrentPages();
		if (pages.length < 2) {
			return;
		}

		const page = pages[pages.length - 1];
		if (page.onFinishResult) {
			uni.navigateBack({
				success: function() {
					page.onFinishResult(result);
				}
			});
		}
	}
};
