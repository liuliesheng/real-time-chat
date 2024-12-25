if (typeof Page !== "undefined") {
	// 重置Page函数
	const originalPage = Page;
	Page = function(options) {
		const pageMixin = (function() {
			try {
				return require('../../../common/config/page.js');
			} catch (e) {
				console.warn("/common/config/page.js not found!");
				return {};
			}
		})();

		options = Object.assign({}, pageMixin, options);
		originalPage(options);
	};
}
