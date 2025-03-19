/** @var {*} $ */
import $ from "../$";

let events = null;

try {
	events = require('../../common/middlewares/index.js');

	if (typeof events === 'function') {
		events = events();
	}
} catch (e) {
	console.warn("/common/middlewares/index.js not found!");
	events = {};
}

// 监听事件
for (const key in events) {
	if (!events.hasOwnProperty(key)) {
		continue;
	}

	$.$emitter.on(key, events[key]);
}
