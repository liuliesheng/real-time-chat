// 尝试订阅消息
import $ from "../../$";

$.$define('tryRequestSubscribeMessage', function(options) {
	return new Promise(function(resolve) {
		$.getSetting({
			withSubscriptions: true,
			success: (res) => {
				const subscriptionsSetting = res.subscriptionsSetting.itemSettings || {};

				const allowTempIds = [];
				options.tmplIds.forEach(temlId => {
					if (subscriptionsSetting[temlId] === 'accept') {
						allowTempIds.push(temlId);
					}
				});

				if (allowTempIds.length) {
					uni.requestSubscribeMessage({
						tmplIds: allowTempIds,
						complete: resolve
					});
				} else {
					resolve({
						errMsg: 'Contains an unauthorized template message ID',
					});
				}

			},
			fail: resolve
		});
	});
});

// 自动尝试订阅模板消息
$.$define('autoRequestSubscribeMessage', function() {
	const tmplIds = $.$config ? $.$config.tmplIds : null;
	if (!tmplIds || !tmplIds.length) {
		console.debug('The default subscription message template ID is not defined.');
		return;
	}

	$.$tryRequestSubscribeMessage({
		tmplIds: tmplIds
	}).then((res) => {
		console.debug('Automatic attempt to authorize subscription message template ID.', res);
	});
});
