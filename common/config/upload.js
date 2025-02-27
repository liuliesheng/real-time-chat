// 上传
module.exports = {
	// 默认磁盘
	disk: 'qiniu',

	// 上传驱动
	disks: {
		// 远程服务器上传
		remote: {
			driver: 'remote',
			url: '/upload'
		},

		// 七牛上传
		qiniu: {
			driver: 'qiniu',
			// 获取token信息地址，优先级最高
			tokenUrl: '/upload/token',
			uptokenURL: 'https://yourserver.com/api/uptoken',
			// uptoken: 'xxxx',
			domain: 'http://owzs78.bkt.clouddn.com/'
			region: 'NCN', // 华北区
		}
	}
};
