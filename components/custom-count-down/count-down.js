const callbacks = [];

setInterval(function() {
	callbacks.forEach(callback => callback());
}, 1000);

export default {
	push: function(callback) {
		callbacks.push(callback);
	},
	remove: function(callback) {
		const index = callbacks.indexOf(callback);
		if (index !== -1) {
			callbacks.splice(index, 1);
		}
	}
}
