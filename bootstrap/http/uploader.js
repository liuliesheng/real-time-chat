import { request } from "./request";

/**
 * 上传器
 * @param {Array} files
 * @param {String} options
 */
export default function uploader(files, options) {
	const triggerChange = function(params) {
		options.onUploadChange && options.onUploadChange.call(this, params);
	};

	const upload = function(file, index) {
		return http.request(Object.assign({
			url: config.url
		}, options, {
			filePath: file
		})).then(config.onUploadedSuccess || function(res) {
			return {
				url: res.data.picture_url,
				picture_id: res.data.picture_id,
			};
		}).then((res) => {
			res.state = 1;
			res.index = index;
			triggerChange(res);
		}, (err) => {
			err.state = 2;
			triggerChange(err);
		}).finally(() => {
			if (index < files.length - 1) {
				upload(index + 1);
			}
		});
	};
	upload(0);
}

// 默认配置
uploader.defaults = {};
