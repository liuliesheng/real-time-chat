export default function(options) {
	uni.$models.basic.getConfig().then((config) => {
		const globalData = getApp().globalData;
		Object.assign(globalData, config);

		if (!globalData.support) {
			if (config['web.support_title']) {
				globalData.support = {
					title: config['web.support_title'],
					icon: config['web.support_icon']
				};
			} 
			// else if (config['web.site_title']) {
			// 	globalData.support = {
			// 		title: config['web.site_title'],
			// 		icon: config['web.site_logo']
			// 	};
			// }
		}

		uni.$emitter.emit('refresh-global-config', config);
	});
}
