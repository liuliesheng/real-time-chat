export default {
	// 获取默认配置信息
	getBasicConfig() {
		return uni.$http.get('/app/website/index/index');
	},

	// 获取关于我们信息
	getAbout() {
		return uni.$http.get('/app/website/index/about');
	},

	// 获取文章列表
	getArticleList(data, options = {}) {
		return uni.$http.get('/app/website/article/index', data, options);
	},

	// 获取文章详情
	getArticleDetail(id, options = {}) {
		return uni.$http.get('/app/website/article/detail', {
			id: id
		}, options);
	},

	// 获取文章分类列表
	getArticleCategoryList(data, options = {}) {
		return uni.$http.get('/app/website/article_category/index', data, options);
	},

	// 获取产品列表
	getProductList(data, options = {}) {
		return uni.$http.get('/app/website/product/index', data, options);
	},

	// 获取产品详情
	getProductDetail(id, options = {}) {
		return uni.$http.get('/app/website/product/detail', {
			id: id
		}, options);
	},

	// 获取产品分类列表
	getProductCategoryList(data, options = {}) {
		return uni.$http.get('/app/website/product_category/index', data, options);
	},

	// 获取案例列表
	getCaseList(data, options = {}) {
		return uni.$http.get('/app/website/case/index', data, options);
	},

	// 获取案例详情
	getCaseDetail(id, options = {}) {
		return uni.$http.get('/app/website/case/detail', {
			id: id
		}, options);
	},

	// 获取案例分类列表
	getCaseCategoryList(data, options = {}) {
		return uni.$http.get('/app/website/case_category/index', data, options);
	},

	// 创建留言
	submitLeavingMsg(data, options = {}) {
		return uni.$http.post('/app/website/index/submitleavingmsg', data, options);
	}
}
