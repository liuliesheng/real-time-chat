export default function publisher(name) {
	const callbackList = [];
	return {
		add: function add(...callbacks) {
			for (let i = 0; i < callbacks.length; i++) {
				const callback = callbacks[i];
				if (callbackList.indexOf(callback) !== -1) {
					throw new Error('同一个主题不能重复定义订阅者！');
				}
				callbackList.push(callback);
			}
		},
		remove: function remove() {
			const index = callbackList.indexOf(callback);
			if (index !== -1) callbackList.splice(index, 1);
		},
		send: function send(detail) {
			callbackList.forEach(function(callback) {
				setTimeout(function() {
					const event = {
						publisher: name,
						detail: detail
					};
					callback.call(null, event);
				}, 0);
			});
		}
	};
}
