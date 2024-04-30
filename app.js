//app.js
import "./bootstrap/index";

App({
	onLaunch: function() {
		const aaa = wx.publisher('aaa');
		aaa.add(function(event) {
			console.log('sub1', event);
		}, function(event) {
			console.log('sub2', event);
		}, function(event) {
			console.log('sub3', event);
		}, function(event) {
			console.log('sub4', event);
		}, function(event) {
			console.log('sub5', event);
		});
		aaa.send({
			user: '123'
		});
	},
	globalData: {
		userInfo: null
	}
});


