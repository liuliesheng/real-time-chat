import remoteDriver from "./upload/remote.js";
import qiniuDriver from "./upload/qiniu.js";

/**
 * 上传器
 * @param {files:Array,...} options
 */
export default function upload(options) {
	const disk = options.disk || upload.defaults.disk || 'remote';
	const diskConfig = upload.defaults.disks[disk];
	if (!diskConfig) {
		return Promise.reject({ errMsg: "找不到磁盘信息！" });
	}

	options = Object.assign({}, diskConfig, options);
	console.debug('upload options:', options);

	const driver = resolveDriver(options.driver);

	const triggerChange = function(params) {
		options.onUploadChange && options.onUploadChange.call(this, params);
	};


	return new Promise((resolve, reject) => {
		const result = [];

		(function handler(file, index) {
			options.file = file;
			driver(options).then((res) => {
				res.state = 1;
				res.index = index;
				result.push(res);
				triggerChange(res);
			}, (err) => {
				err.state = 2;
				result.push(res);
				triggerChange(err);
			}).finally(() => {
				if (index < files.length - 1) {
					handler(index + 1);
				} else {
					resolve();
				}
			});
		})(0);
	});
}

// 解析驱动
function resolveDriver(driver) {
	if ('qiniu' === driver) {
		return qiniuDriver;
	}

	return remoteDriver;
}

// 默认配置
upload.defaults = {
	// 默认磁盘
	disk: 'remote',

	// 上传驱动
	disks: {
		// 远程服务器上传
		remote: {
			// url: '/upload'
		},

		// 七牛上传
		qiniu: {
			// ...
		}
	}
};
