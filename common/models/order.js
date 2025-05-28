export default {
	// 获取订单列表
	getOrderList(query, options = {}) {
		return uni.$http.get('/app/order/index', query, options).then((res) => {
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
	getOrderDetail(id, options = {}) {
		return uni.$http.get('/app/order/index/detail', {
			id: id
		}, options).then((res) => {
			const { stateTip, stateTipColor } = this.parseOrderState(res.order_status);
			res.stateTip = stateTip;
			res.stateTipColor = stateTipColor;

			return res;
		});
	},

	// 获取订单支付信息
	getOrderPaymentInfo(query, options = {}) {
		return uni.$http.post('/app/order/order_paid/index', query, Object.assign({
			successTips: false
		}, options));
	},

	// 删除订单
	deleteOrder(id, options = {}) {
		return uni.$http.get('/app/order/index/delete', {
			id: id
		}, options);
	},

	// 取消订单
	setOrderCancel(id, options = {}) {
		return uni.$http.get('/app/order/index/cancel', {
			id: id
		}, options);
	},

	// 确认订单收货
	setOrderReceipt(id, options = {}) {
		return uni.$http.get('/app/order/index/receipt', {
			id: id
		}, options);
	},

	// 获取商品预评价信息
	getPreGoodsEvaluate(id, options = {}) {
		return uni.$http.get('/app/order/goods_evaluate/create', {
			order_id: id
		}, options);
	},

	// 创建商品评价
	createGoodsEvaluate(data, options = {}) {
		return uni.$http.post('/app/order/goods_evaluate/create', data, options);
	},

	// 获取订单物流信息
	getExpressTracks(orderId, options = {}) {
		return uni.$http.get('/app/order/express/tracks', {
			order_id: orderId
		}, options);
	},

	// 获取预退款信息
	getRefundApplyInfo(query, options = {}) {
		return uni.$http.get('/app/order/refund_apply', query, options);
	},

	// 创建售后单
	applyRefund(data, options = {}) {
		return uni.$http.post('/app/order/refund_apply', data, options);
	},

	// 获取售后单列表
	getRefundList(data, options = {}) {
		return uni.$http.get('/app/order/refund', data, options).then((res) => {
			res.data.forEach((item) => {
				const { stateTip, stateTipColor } = this.parseRefundState(item.status);
				item.stateTip = stateTip;
				item.stateTipColor = stateTipColor;
			});

			return res;
		});
	},

	// 获取售后单详情
	getRefundDetail(id, options = {}) {
		return uni.$http.get('/app/order/refund/detail', {
			id: id
		}, options).then((res) => {
			const { stateTip, stateTipColor } = this.parseRefundState(res.status);
			res.stateTip = stateTip;
			res.stateTipColor = stateTipColor;

			return res;
		});
	},

	// 删除售后单
	deleteRefund(id, options = {}) {
		return uni.$http.get('/app/order/refund/delete', {
			id: id
		}, options);
	},

	// 提交售后物流信息
	submitRefundDelivery(data, options = {}) {
		return uni.$http.post('/app/order/refund/delivery', data, options);
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
	},

	// 获取物流列表
	getExpressList() {
		return uni.$http.get('/app/order/express', {}, options);
	}
}
