export default {
	methods: {
		// 删除售后记录
		deleteRefund(item, cb) {
			uni.showModal({
				content: '是否确认删除售后单？',
				success: (res) => {
					if (res.cancel) {
						return;
					}

					uni.$models.order.deleteRefund(item.id, {
						loading: this,
						hint: this,
					}).then((res) => {
						this.hintSuccess('售后单已删除！');

						cb && cb(item);
					});
				}
			});
		}
	}
};
