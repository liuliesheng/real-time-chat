import $ from "../$";

// 事件处理
(function() {
	let events = null;

	try {
		events = require('../../common/events/index.js');

		if (typeof events === 'function') {
			events = events();
		}
	} catch (e) {
		console.warn("/common/events/index.js not found!");
		events = {};
	}

	// 监听事件
	for (const key in events) {
		if (!events.hasOwnProperty(key)) {
			continue;
		}

		for (const cb of events[key]) {
			$.$emitter.on(key, cb);
		}
	}
})();
