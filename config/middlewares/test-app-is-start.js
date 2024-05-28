export default {
	name: 'test-app-is-start',
	handle: function(next, options) {
		console.log('params:', options);
		next();
	}
};
