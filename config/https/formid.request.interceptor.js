export default function(res) {
	// 上报formid
	if (res.method === 'post') {
		const formid = wx.pullFormid(20);
		if (formid.length) {
			res.data.__formid__ = formid;
		}
	} else {
		const formid = wx.pullFormid();
		if (formid.length) {
			res.data.__formid__ = formid[0];
		}
	}
};
