export default {
	name: 'print params',
	handle: function(next, options) {
		console.log('params:', options);
		next();
	}
};
