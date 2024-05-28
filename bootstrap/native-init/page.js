// 重置Page函数
const originalPage = Page;
Page = function(options) {
	const pageMixin = (function() {
		try {
			return require('../../config/page.js');
		} catch (e) {
			return {};
		}
	})();

	options = Object.assign({}, pageMixin, options);
	originalPage(options);
};
