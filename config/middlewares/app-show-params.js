export default {
	name: 'print params',
	handle: function(next, options) {
		console.log('app show params:', options);
		next();
	}
};
