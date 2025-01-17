export default {
	methods: {
		// 重新解析订单状态
		parseOrderStatus(index, state, targetNavIndex) {
			const { stateTip, stateTipColor } = uni.$model.mall.parseOrderState(state);

			const list = this.choiceNav.data,
				item = list[index];
			item.order_status = state;
			item.stateTip = stateTip;
			item.stateTipColor = stateTipColor;

			if (this.tabCur === 0 && targetNavIndex) {
				if (typeof targetNavIndex !== 'object') {
					targetNavIndex = [targetNavIndex];
				}

				const handler = (navIndex) => {
					const targetNav = this.navList[navIndex];
					if (!targetNav.loaded) {
						return null;
					}

					const targetList = targetNav.data;
					for (let i = 0; i < targetList.length; i++) {
						const item2 = targetList[i];
						if (item2.id !== item.id) {
							continue;
						}

						return targetList.splice(i, 1)[0];
					}
				};

				for (let navIndex of targetNavIndex) {
					const delItem = handler(navIndex);
					if (delItem) {
						return delItem;
					}
				}

				return null;
			} else {
				for (const item2 of this.navList[0].data) {
					if (item2.id !== item.id) {
						continue;
					}

					item2.order_status = state;
					item2.stateTip = stateTip;
					item2.stateTipColor = stateTipColor;
					break;
				}

				return list.splice(index, 1)[0];
			}
		},

		//删除订单
		deleteOrder(index) {
			const list = this.choiceNav.data,
				item = list[index];

			uni.showModal({
				content: '是否确认删除订单？',
				success: (res) => {
					if (res.cancel) {
						return;
					}

					uni.$model.mall.deleteOrder(item.id, {
						loading: this,
						hint: this,
					}).then((res) => {
						this.hintSuccess('订单已删除！');
						list.splice(index, 1);
					});
				}
			});
		},

		//取消订单
		cancelOrder(index) {
			const list = this.choiceNav.data,
				item = list[index];

			uni.showModal({
				content: '是否确认取消订单？',
				success: (res) => {
					if (res.cancel) {
						return;
					}

					uni.$model.mall.setOrderCancel(item.id, {
						loading: this,
						hint: this,
					}).then((res) => {
						// 删除待支付列表，更新全部订单列表
						this.parseOrderStatus(index, 0, 1);
						this.hintSuccess('订单已取消！');
					});
				}
			});
		},

		// 支付订单
		payOrder(index) {
			const list = this.choiceNav.data,
				item = list[index];

			// 更新列表
			const updateList = () => {
				const delItem = this.parseOrderStatus(index, 20, 2);
				if (delItem && this.navList[2].loaded) {
					console.log(this.navList[2])
					this.navList[2].data.unshift(delItem);
				}
			};

			const payTypeMap = {
				0: 10,
				1: 20
			};
			uni.showActionSheet({
				itemList: ['余额支付', '微信支付'],
				success: (res) => {
					const type = payTypeMap[res.tapIndex];

					uni.$model.mall.getOrderPaymentInfo({
						id: item.id,
						type: type
					}, {
						loading: this,
						hint: this,
					}).then((res) => {
						if (res.state === 1) { // 余额支付
							updateList();
							this.hintSuccess('已支付！');
						} else { // 微信支付
							uni.requestPayment({
								...res,
								success: () => {
									updateList();
									this.hintSuccess('已支付！');
								}
							});
						}
					});
				}
			});
		},

		// 确认订单
		confirmOrder(index) {
			const list = this.choiceNav.data,
				item = list[index];

			uni.showModal({
				content: '是否确认收货？',
				success: (res) => {
					if (res.cancel) {
						return;
					}

					uni.$model.mall.setOrderReceipt(item.id, {
						loading: this,
						hint: this,
					}).then((res) => {
						//确认订单后删除待收货列表，增加待评价列表
						const delItem = this.parseOrderStatus(index, 40, [2, 3]);
						if (delItem && this.navList[4].loaded) {
							this.navList[4].data.unshift(delItem);
						}

						this.hintSuccess('已确认收货！');
					});
				}
			});
		},
	}
};
