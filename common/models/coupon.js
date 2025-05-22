export default {
	// 优惠券列表
	getList(data, options = {}) {
		return uni.$http.get('app/coupon/index/index', data, options);
	},
	// 领取优惠券
	give(id, options = {}) {
		return uni.$http.post('app/coupon/index/give', { id: id }, options);
	},
	// 我的优惠券
	getUserList(data, options = {}) {
		return uni.$http.get('app/coupon/user/index', data, options);
	},
};
