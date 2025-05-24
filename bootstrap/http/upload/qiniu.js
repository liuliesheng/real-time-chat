import extMaps from './ext.maps.js';
const qiniuUploader = require("../../libs/qiniuUploader");

export default function(options) {
	return init(options).then((uploadOptions) => {
		return new Promise((resolve, reject) => {
			qiniuUploader.upload(options.filepath, (res) => {
				resolve(
					options.onUploadedSuccess ?
					options.onUploadedSuccess(res) : res.data,
				);
			}, (error) => {
				console.error('qiniu error: ' + JSON.stringify(error));
				reject(error);
			}, uploadOptions);
		});
	});
};

function init(options) {
	if (!options.tokenInfoUrl) {
		return Promise.resolve(options);
	}

	if (!options.file) {
		return Promise.reject({
			errMsg: '没有文件要上传',
		});
	}

	let fileType = 'file';
	const file = options.file;
	const filename = typeof file === 'string' ? file : file.name || file.path;
	const filepath = options.filepath = typeof file === 'string' ? file : file.path;

	const dotIndex = filename.lastIndexOf('.');
	const ext = dotIndex > 0 ? filename.substring(dotIndex + 1, filename.length).toLowerCase() : '';

	let uploadFile = null;
	if (extMaps[ext]) {
		uploadFile = {
			path: filepath,
			type: extMaps[ext].contentType
		};
		fileType = extMaps[ext].type;
	} else {
		uploadFile = {
			path: filepath,
			type: 'application/octet-stream'
		};
	}

	return uni.$http.post(options.tokenInfoUrl, {
		file: uploadFile,
		type: fileType,
	}, {
		successTips: false,
	}).then((res) => {
		return Object.assign(options, {
			key: res.key,

			// bucket所在区域，这里是华北区。ECN, SCN, NCN, NA, ASG，分别对应七牛云的：华东，华南，华北，北美，新加坡 5 个区域
			region: res.region || 'NCN',

			// 获取uptoken方法三选一即可，执行优先级为：uptoken > uptokenURL > uptokenFunc。三选一，剩下两个置空。推荐使用uptokenURL，详情请见 README.md
			// 由其他程序生成七牛云uptoken，然后直接写入uptoken
			uptoken: res.token,
			// 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "0MLvWPnyy..."}
			// uptokenURL: 'https://[yourserver.com]/api/uptoken',
			// uptokenFunc 这个属性的值可以是一个用来生成uptoken的函数，详情请见 README.md
			// uptokenFunc: function () {
			//     // do something
			//     return qiniuUploadToken;
			// },

			// bucket 外链域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 fileURL 字段。否则需要自己拼接
			domain: res.domain,

			// qiniuShouldUseQiniuFileName 如果是 true，则文件的 key 由 qiniu 服务器分配（全局去重）。如果是 false，则文件的 key 使用微信自动生成的 filename。出于初代sdk用户升级后兼容问题的考虑，默认是 false。
			// 微信自动生成的 filename较长，导致fileURL较长。推荐使用{qiniuShouldUseQiniuFileName: true} + "通过fileURL下载文件时，自定义下载名" 的组合方式。
			// 自定义上传key 需要两个条件：1. 此处shouldUseQiniuFileName值为false。 2. 通过修改qiniuUploader.upload方法传入的options参数，可以进行自定义key。（请不要直接在sdk中修改options参数，修改方法请见demo的index.js）
			// 通过fileURL下载文件时，文件自定义下载名，请参考：七牛云“对象存储 > 产品手册 > 下载资源 > 下载设置 > 自定义资源下载名”（https://developer.qiniu.com/kodo/manual/1659/download-setting）。本sdk在README.md的"常见问题"板块中，有"通过fileURL下载文件时，自定义下载名"使用样例。
			shouldUseQiniuFileName: true
		});
	});
}
