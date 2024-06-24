// 重置Component函数
const originalComponent = Component;
Component = function(options) {
	const componentMixin = (function() {
		try {
			return require('../../config/component.js');
		} catch (e) {
			return {};
		}
	})();

	options = Object.assign({}, componentMixin, options);
	originalComponent(options);
};
