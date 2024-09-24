if (typeof Component !== "undefined") {
	// 重置Component函数
	const originalComponent = Component;
	Component = function(options) {
		const componentMixin = (function() {
			try {
				return require('../../config/component.js');
			} catch (e) {
				console.warn("/config/component.js not found!");
				return {};
			}
		})();
		options.methods = Object.assign({}, componentMixin.methods || {}, options.methods || {});
		options = Object.assign({}, componentMixin, options);
		originalComponent(options);
	};
}
