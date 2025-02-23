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

	// 获取商品收藏记录
	getGoodsFavoriteList(query, options) {
		return uni.$http.get('/plugin/mall/goods/favoriteList', query, options);
	},

	// 收藏商品
	favoriteGoods(topicId, options = {}) {
		return uni.$http.get('favorite/favorite', {
			topic_id: topicId,
		}, options);
	},

	// 取消收藏
	unfavoriteGoods(topicId, options = {}) {
		return uni.$http.get('favorite/unfavorite', {
			topic_id: topicId
		}, options);
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
	addShoppingCart(data, options) {
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
	createOrderFormGoods(data, options) {
		return uni.$http.post('/plugin/mall/advance_order/fromgoods', data, options);
	},

	// 获取预下单信息 - 来自购物车
	getAdvanceOrderFormCart(query, options) {
		return uni.$http.get('/plugin/mall/advance_order/fromshoppingcart', query, options);
	},

	// 创建预下单 - 来自购物车
	createOrderFormCart(data, options) {
		return uni.$http.post('/plugin/mall/advance_order/fromshoppingcart', data, options);
	},

	// 获取订单列表
	getOrderList(query, options) {
		return uni.$http.get('/plugin/mall/order', query, options).then((res) => {
			res.data.forEach((item) => {
				const { stateTip, stateTipColor } = this.parseOrderState(item.order_status);
				item.stateTip = stateTip;
				item.stateTipColor = stateTipColor;


				item.goods_num = item.goods_list.reduce(function(result, it) {
					return result + it.goods_num;
				}, 0);
			});

			return res;
		});
	},

	// 获取订单详情
	getOrderDetail(id, options) {
		return uni.$http.get('/plugin/mall/order/detail', {
			id: id
		}, options).then((res) => {
			const { stateTip, stateTipColor } = this.parseOrderState(res.order_status);
			res.stateTip = stateTip;
			res.stateTipColor = stateTipColor;

			return res;
		});
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

	// 获取商品评价列表
	getGoodsEvaluateList(query, options) {
		return uni.$http.get('/plugin/mall/goods_evaluate', query, options);
	},

	// 获取商品预评价信息
	getPreGoodsEvaluate(id, options) {
		return uni.$http.get('/plugin/mall/goods_evaluate/create', {
			order_id: id
		}, options);
	},

	// 创建商品评价
	createGoodsEvaluate(data, options) {
		return uni.$http.post('/plugin/mall/goods_evaluate/create', data, options);
	},

	// 获取订单物流信息
	getExpressTracks(orderId, options) {
		return uni.$http.get('/plugin/mall/express', {
			order_id: orderId
		}, options);
	},

	// 获取预退款信息
	getRefundApplyInfo(query, options) {
		return uni.$http.get('/plugin/mall/refund_apply', query, options);
	},

	// 创建售后单
	applyRefund(data, options) {
		return uni.$http.post('/plugin/mall/refund_apply', data, options);
	},

	// 获取售后单列表
	getRefundList(data, options) {
		return uni.$http.get('/plugin/mall/refund', data, options).then((res) => {
			res.data.forEach((item) => {
				const { stateTip, stateTipColor } = this.parseRefundState(item.status);
				item.stateTip = stateTip;
				item.stateTipColor = stateTipColor;
			});

			return res;
		});
	},

	// 获取售后单详情
	getRefundDetail(id, options) {
		return uni.$http.get('/plugin/mall/refund/detail', {
			id: id
		}, options).then((res) => {
			const { stateTip, stateTipColor } = this.parseRefundState(res.status);
			res.stateTip = stateTip;
			res.stateTipColor = stateTipColor;

			return res;
		});
	},

	// 删除售后单
	deleteRefund(id, options) {
		return uni.$http.get('/plugin/mall/refund/delete', {
			id: id
		}, options);
	},

	// 提交售后物流信息
	submitRefundDelivery(data, options) {
		return uni.$http.post('/plugin/mall/refund/delivery', data, options);
	},

	// 获取订单状态
	parseOrderState(state) {
		state = parseInt(state);
		let stateTip = '',
			stateTipColor = '#909399';
		if (0 === state) {
			stateTip = '已取消';
		} else if (1 === state) {
			stateTip = '已关闭';
		} else if (10 === state) {
			stateTip = '待付款';
		} else if (20 === state) {
			stateTip = '待发货';
		} else if (30 === state) {
			stateTip = '待收货';
		} else if (40 === state) {
			stateTip = '待评价';
		} else if (50 === state) {
			stateTip = '已完成';
		}
		return { stateTip, stateTipColor };
	},

	// 获取退款单状态
	parseRefundState(state) {
		state = parseInt(state);
		let stateTip = '',
			stateTipColor = '#909399';
		if (0 === state) {
			stateTip = '审核中';
		} else if (10 === state) {
			stateTip = '待买家退货';
		} else if (20 === state) {
			stateTip = '待卖家签收';
		} else if (30 === state) {
			stateTip = '维权结束';
		} else if (40 === state) {
			stateTip = '商家已拒绝';
		}
		return { stateTip, stateTipColor };
	}
}
