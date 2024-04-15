//app.js
import "./bootstrap/index";

App({
	onLaunch: function() {
		const publisher = wx.publisher('a');
		publisher.on(function() {
			console.log('hello world');
		});
		publisher('haha');
		// console.log(wx);
	},
	globalData: {
		userInfo: null
	}
});


