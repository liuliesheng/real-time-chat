export default {
	// 获取商品列表
	getGoodsList(query, options = {}) {
		return uni.$http.get('/app/mall/goods', query, options);
	},

	// 获取商品详情
	getGoodsDetail(id, options = {}) {
		return uni.$http.get('/app/mall/goods/detail', {
			id: id
		}, options);
	},

	// 获取商品SKU数据
	getGoodsSku(id, options = {}) {
		return uni.$http.get('/app/mall/goods/skudata', {
			id: id
		}, options);
	},

	// 获取海报信息
	getGoodsPoster(data, options) {
		return uni.$http.get('/app/mall/goods/poster', data, options);
	},

	// 获取商品评价列表
	getGoodsAppraiseList(query, options = {}) {
		return uni.$http.get('/app/mall/goods_appraise', query, options);
	},

	// 获取商品预评价信息
	getPreGoodsAppraise(id, options = {}) {
		return uni.$http.get('/app/mall/goods_appraise/create', {
			order_id: id
		}, options);
	},

	// 创建商品评价
	createGoodsAppraise(data, options = {}) {
		return uni.$http.post('/app/mall/goods_appraise/create', data, options);
	},

	// 获取商品浏览记录
	getGoodsBrowseList(query, options = {}) {
		return uni.$http.get('/app/mall/goods/browseList', query, options);
	},

	// 获取分类列表
	getCategoryList(query, options = {}) {
		return uni.$http.get('/app/mall/category', query, options);
	},

	// 获取购物车列表
	getShoppingCartList(query, options = {}) {
		return uni.$http.get('/app/mall/shopping_cart', query, options);
	},

	// 获取购物车列表
	addShoppingCart(data, options = {}) {
		return uni.$http.post('/app/mall/shopping_cart/create', data, options);
	},

	// 变更购物车数量
	changeShoppingCart(id, count, options = {}) {
		return uni.$http.post('/app/mall/shopping_cart/change', {
			id: id,
			count: count
		}, options);
	},

	// 删除购物车
	forgetShoppingCart(ids, options = {}) {
		return uni.$http.get('/app/mall/shopping_cart/delete', {
			ids: ids
		}, options);
	},

	// 获取预下单信息 - 来自商品
	getAdvanceOrderFormGoods(query, options = {}) {
		return uni.$http.get('/app/mall/advance_order/fromgoods', query, options);
	},

	// 创建预下单 - 来自商品
	createOrderFormGoods(data, options = {}) {
		return uni.$http.post('/app/mall/advance_order/fromgoods', data, options);
	},

	// 获取预下单信息 - 来自购物车
	getAdvanceOrderFormCart(query, options = {}) {
		return uni.$http.get('/app/mall/advance_order/fromshoppingcart', query, options);
	},

	// 创建预下单 - 来自购物车
	createOrderFormCart(data, options = {}) {
		return uni.$http.post('/app/mall/advance_order/fromshoppingcart', data, options);
	},

}
