const $ = uni;

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
