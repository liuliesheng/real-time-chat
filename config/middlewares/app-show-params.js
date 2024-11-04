export default {
	name: 'app-show-params',
	handle: function(next, options) {
		console.log('app show params:', options);
		next();
	}
};
