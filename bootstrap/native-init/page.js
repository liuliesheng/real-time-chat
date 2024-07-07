// 重置Page函数
import $ from "./global.ext";

const originalPage = Page;
const newPage = function(options) {
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


try {
	Page = newPage;
} catch (e) {
	$.define('Page', newPage);
}
