export default {
	//删除订单
	deleteOrder(item, cb) {
		uni.showModal({
			content: '是否确认删除订单？',
			success: (res) => {
				if (res.cancel) {
					return;
				}

				uni.$models.order.deleteOrder(item.id, {
					loading: this,
					hint: this,
				}).then((res) => {
					this.hintSuccess('订单已删除！');

					cb && cb(item);
				});
			}
		});
	},

	//取消订单
	cancelOrder(item, cb) {
		uni.showModal({
			content: '是否确认取消订单？',
			success: (res) => {
				if (res.cancel) {
					return;
				}

				uni.$models.order.setOrderCancel(item.id, {
					loading: this,
					hint: this,
				}).then((res) => {
					this.hintSuccess('订单已取消！');

					cb && cb(item);
				});
			}
		});
	},

	// 支付订单
	payOrder(item, cb) {
		const payTypeMap = {
			0: 10,
			1: 20
		};
		uni.showActionSheet({
			itemList: ['余额支付', '微信支付'],
			success: (res) => {
				const type = payTypeMap[res.tapIndex];
				uni.$models.order.getOrderPaymentInfo({
					id: item.id,
					type: type
				}, {
					loading: this,
					hint: this,
				}).then((res) => {
					if (res.state === 1) { // 余额支付
						this.hintSuccess('已支付！');
						cb && cb(item);
					} else { // 微信支付
						uni.requestPayment({
							...res,
							success: () => {
								this.hintSuccess('已支付！');
								cb && cb(item);
							}
						});
					}
				});
			}
		});
	},

	// 确认订单
	confirmOrder(item, cb) {
		uni.showModal({
			title: '确认收到货了吗？',
			content: '为了保障您的售后权益，请收到商品检查无误后再确认收货？',
			success: (res) => {
				if (res.cancel) {
					return;
				}

				uni.$models.order.setOrderReceipt(this.id, {
					loading: this,
					hint: this,
				}).then((res) => {
					this.hintSuccess('已确认收货！');

					cb && cb(item);
				});
			}
		});
	}
}
