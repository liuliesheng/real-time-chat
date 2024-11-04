export default {
	name: 'app-load-params',
	handle: function(next, options) {
		console.log('app load params:', options);
		next();
	}
};
