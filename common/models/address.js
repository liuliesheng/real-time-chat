export default {
	// 获取收货地址
	getList(query, options = {}) {
		return uni.$http.get('user.address', query, options);
	},

	// 获取收货地址详情
	getDetail(id, options = {}) {
		return uni.$http.get('user.address/detail', {
			id: id
		}, options);
	},

	// 创建收货地址
	create(data, options = {}) {
		return uni.$http.post('user.address/create', data, options);
	},

	// 修改收货地址
	update(id, data, options = {}) {
		data.id = id;
		return uni.$http.post('user.address/update', data, options);
	},

	// 删除收货地址
	forget(ids, options = {}) {
		return uni.$http.get('user.address/delete', {
			ids: ids
		}, options);
	},

	// 设置默认收货地址
	setDefault(id, options = {}) {
		return uni.$http.get('user.address/setdefault', {
			id: id
		}, options);
	},
}
