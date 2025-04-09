export default {
	// 获取门店列表
	getList(data, options = {}) {
		return uni.$http.get('/app/shop/index/index', data, options);
	},

	// 获取门店详情
	getDetail(id, options = {}) {
		return uni.$http.get('/app/shop/index/detail', {
			id: id
		}, options);
	},

	// 获取门店分类列表
	getCategories(data, options = {}) {
		return uni.$http.get('/app/shop/index/categories', data, options);
	},

	// 获取申请门店预载入信息
	getApplyInfo(options = {}) {
		return uni.$http.get('/app/shop/apply/getinfo', null, options);
	},

	// 申请门店
	apply(data, options = {}) {
		return uni.$http.post('/app/shop/apply/apply', data, options);
	},

	// 申请提现
	applyCashout(data, options = {}) {
		return uni.$http.post('/app/shop/cashout/apply', data, options);
	},

	// 获取提现列表
	getCashoutList(data, options = {}) {
		return uni.$http.get('/app/shop/cashout/logs', data, options);
	},

	// 去支付
	goPay(data, options = {}) {
		options.successTips = false;
		return uni.$http.post('/app/shop/pay/pay', data, options).then(function(res) {
			if (data.pay_type !== 1) {
				return uni.$promise.requestPayment(res);
			}

			return res;
		});
	},

	// 获取门店配置
	getConfig(options = {}) {
		return uni.$http.get('/app/shop/config/index', {}, options);
	},

	// 设置门店配置
	setConfig(data, options = {}) {
		return uni.$http.post('/app/shop/config/update', data, options);
	},

	// 获取我的门店
	getMyDetail(options = {}) {
		return uni.$http.get('/app/shop/manager/getinfo', null, options);
	},

	// 获取我的门店绑定的银行卡信息
	getMyBankInfo(options = {}) {
		return uni.$http.get('/app/shop/manager/getbank', null, options);
	},

	// 获取我的门店二维码信息
	getMyPayQrCode(options = {}) {
		return uni.$http.get('/app/shop/manager/getpayqrcode', null, options);
	},

	// 获取我的门店订单列表
	getMyOrderList(data, options = {}) {
		return uni.$http.get('/app/shop/order/index', data, options);
	},

	// 获取用户订单列表
	getUserOrderList(data, options = {}) {
		return uni.$http.get('/app/shop/user_pay_order/index', data, options);
	},

	// 获取成员列表
	getMemberList(data, options = {}) {
		return uni.$http.get('/app/shop/partner/getChildList', data, options);
	},
}
