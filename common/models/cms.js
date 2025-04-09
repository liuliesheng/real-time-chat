export default {
	// 获取文章列表
	getPostList(query, options = {}) {
		return uni.$http.get('/app/cms/post', query, options);
	},

	// 获取文章详情
	getPostDetail(id, options = {}) {
		return uni.$http.get('/app/cms/post/detail', {
			id: id
		}, options);
	},

	// 创建文章
	createPost(data, options = {}) {
		return uni.$http.post('/app/cms/post/create', data, options);
	},

	// 获取文章浏览记录
	getPostBrowseList(query, options = {}) {
		return uni.$http.get('/app/cms/post/browseList', query, options);
	},

	// 获取分类列表
	getCategoryList(query, options = {}) {
		return uni.$http.get('/app/cms/category', query, options);
	},
}
