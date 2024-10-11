// 获取全局对象
export default (() => {
	if (typeof my !== 'undefined') {
		return my;
	} else if (typeof swan !== 'undefined') {
		return swan;
	} else if (typeof tt !== 'undefined') {
		return tt;
	} else if (typeof wx !== 'undefined') {
		return wx;
	}
	throw new Error('未适配的客户端，请手动在此处理');
})();
