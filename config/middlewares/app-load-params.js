export default {
	name: 'app-load',
	handle: function(next, options) {
		console.log('app load params:', options);
		next();
	}
};
