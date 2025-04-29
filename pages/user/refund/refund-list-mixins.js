export default {
	methods: {
		// 删除售后单
		onDeleteRefund(index) {
			const item = this.data[index];
			this.deleteRefund(item, () => {
				this.data.splice(index, 1);
			});
		}
	}
};
