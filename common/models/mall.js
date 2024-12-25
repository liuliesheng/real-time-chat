export default {
	// 获取商品列表
	getGoodsList(query, options) {
		return uni.$http.get('/plugin/mall/goods', query, options);
	},

	// 获取商品详情
	getGoodsDetail(id, options) {
		return uni.$http.get('/plugin/mall/goods/detail', {
			id: id
		}, options);
	},

	// 获取商品浏览记录
	getGoodsBrowseList(query, options) {
		return uni.$http.get('/plugin/mall/goods/browseList', query, options);
	},

	// 获取分类列表
	getCategoryList(query, options) {
		return uni.$http.get('/plugin/mall/category', query, options);
	},

	// 获取购物车列表
	getShoppingCartList(query, options) {
		return uni.$http.get('/plugin/mall/shopping_cart', query, options);
	},

	// 获取购物车列表
	createShoppingCart(data, options) {
		return uni.$http.post('/plugin/mall/shopping_cart/create', data, options);
	},

	// 变更购物车数量
	changeShoppingCart(id, count, options) {
		return uni.$http.post('/plugin/mall/shopping_cart/change', {
			id: id,
			count: count
		}, options);
	},

	// 删除购物车
	forgetShoppingCart(ids, options) {
		return uni.$http.get('/plugin/mall/shopping_cart/delete', {
			ids: ids
		}, options);
	},

	// 获取预下单信息 - 来自商品
	getAdvanceOrderFormGoods(query, options) {
		return uni.$http.get('/plugin/mall/advance_order/fromgoods', query, options);
	},

	// 创建预下单 - 来自商品
	createAdvanceOrderFormGoods(data, options) {
		return uni.$http.post('/plugin/mall/advance_order/fromgoods', data, options);
	},

	// 获取预下单信息 - 来自购物车
	getAdvanceOrderFormShoppingCart(query, options) {
		return uni.$http.get('/plugin/mall/advance_order/fromshoppingcart', query, options);
	},

	// 创建预下单 - 来自购物车
	createAdvanceOrderFormShoppingCart(data, options) {
		return uni.$http.post('/plugin/mall/advance_order/fromshoppingcart', data, options);
	},

	// 获取订单列表
	getOrderList(query, options) {
		return uni.$http.get('/plugin/mall/order', query, options);
	},

	// 获取订单详情
	getOrderDetail(id, options) {
		return uni.$http.get('/plugin/mall/order/detail', {
			id: id
		}, options);
	},

	// 获取订单支付信息
	getOrderPaymentInfo(query, options) {
		return uni.$http.get('/plugin/mall/order/paid', query, options);
	},

	// 删除订单
	deleteOrder(id, options) {
		return uni.$http.get('/plugin/mall/order/delete', {
			id: id
		}, options);
	},

	// 取消订单
	setOrderCancel(id, options) {
		return uni.$http.get('/plugin/mall/order/cancel', {
			id: id
		}, options);
	},

	// 确认订单收货
	setOrderReceipt(id, options) {
		return uni.$http.get('/plugin/mall/order/receipt', {
			id: id
		}, options);
	},

	// 创建订单评价
	createOrderEvaluate(data, options) {
		return uni.$http.post('/plugin/mall/order/evaluate', data, options);
	},

	// 获取预退款信息
	getRefundApplyInfo(query, options) {
		return uni.$http.get('/plugin/mall/refund_apply', query, options);
	},

	// 创建预退款订单
	createRefundOrder(data, options) {
		return uni.$http.get('/plugin/mall/refund_apply', data, options);
	},

	// 获取退款订单列表
	getRefundList(data, options) {
		return uni.$http.get('/plugin/mall/refund', data, options);
	},

	// 获取退款订单详情
	getRefundList(id, options) {
		return uni.$http.get('/plugin/mall/refund/detail', {
			id: id
		}, options);
	},
}
