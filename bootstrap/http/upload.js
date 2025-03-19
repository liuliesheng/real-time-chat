import remoteDriver from "./upload/remote.js";
import qiniuDriver from "./upload/qiniu.js";

/**
 * 上传器
 * @param {*} options
 */
export default function upload(options) {
	const disk = options.disk || upload.defaults.disk || 'remote';
	const diskConfig = upload.defaults.disks[disk];
	if (!diskConfig) {
		return Promise.reject({errMsg: "找不到磁盘信息！"});
	}

	options = Object.assign({}, diskConfig, options);
	console.debug('upload options:', options);

	const driver = resolveDriver(options.driver);

	const triggerChange = function(params) {
		options.onUploadChange && options.onUploadChange.call(this, params);
	};


	const result = [];
	const files = options.files;

	let promise = Promise.resolve();

	files.forEach((file, index) => {
		options.file = file;
		promise = promise.then(() => {
			const item = {
				state: 0,
				index: index,
			};
			triggerChange(item);
			return driver(options);
		}).then((res) => {
			const item = {
				id: res.id,
				url: res.url || res.path,
				state: 1,
				index: index,
			};
			result.push(item);
			triggerChange(item);
		}, (err) => {
			const item = {
				state: 2,
				index: index,
				errMsg: err.errMsg
			};
			result.push(item);
			triggerChange(item);
		});
	});

	return promise.then(() => result);
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
