export default function publisher(name) {
	const callbacks = [];
	return {
		add: function add(callback) {
			if (callbacks.indexOf(callback) !== -1) {
				throw new Error('同一个主题不能重复定义订阅者！');
			}
			callbacks.push(callback);
		},
		remove: function remove() {
			const index = callbacks.indexOf(callback);
			if (index !== -1) callbacks.splice(index, 1);
		},
		send: function send(detail) {
			callbacks.forEach(function(callback) {
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
