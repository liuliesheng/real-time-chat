const $ = uni.$;
export default function(config) {
	// 上报formid
	if (config.method === 'post') {
		const formid = $.pullFormid(20);
		if (formid.length) {
			config.data.__formid__ = formid;
		}
	} else {
		const formid = $.pullFormid();
		if (formid.length) {
			config.data.__formid__ = formid[0];
		}
	}

	return config;
};
