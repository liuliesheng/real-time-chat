import $ from "../../../$";

// 延迟返回上一页
$.$$define($, '$delayNavigateBack', function(delay, options) {
	setTimeout(function() {
		$.navigateBack(options);
	}, delay);
});

// 错误提示
$.$$define($, '$hintError', function(msg) {
	$.showToast({
		title: msg,
		icon: 'none',
		// duration: 1500000
	});
});

// 成功提示
$.$$define($, '$hintSuccess', function(msg) {
	$.showToast({
		title: msg,
		icon: 'success',
	});
});
