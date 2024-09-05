export default function(config) {
	// 上报formid
	if (config.method === 'post') {
		const formid = uni.pullFormid(20);
		if (formid.length) {
			config.data.__formid__ = formid;
		}
	} else {
		const formid = uni.pullFormid();
		if (formid.length) {
			config.data.__formid__ = formid[0];
		}
	}

	return config;
};
