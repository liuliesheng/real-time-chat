import {http} from "./http";

/**
 * 默认构造器
 * @param {[]} [files]
 */
function Uploader(files) {
	(files || []).forEach(path => {
		this.push({
			state: 0,
			path: path
		});
	});
	return this;
}

//继承数组原型链
Uploader.prototype = [];

//重构构造器
Uploader.prototype.constructor = Uploader;

/**
 * 上传
 * @param {number} index
 */
Uploader.prototype.upload = function(index) {
	const triggerChange = (file, index) => {
		this.onUploadChange && this.onUploadChange.call(this, {
			file: file,
			index: index
		});
	};

	const upload = (file, index) => {
		return request({
			url: 'upload/picture',
			filePath: file.path,
			name: 'file'
		}).then((res) => {
			file.state = 1;
			file.url = res.data.picture_url;
			file.picture_id = res.data.picture_id;
			triggerChange(file, index);
		}, () => {
			file.state = 2;
			triggerChange(file, index);
		});
	};

	if (index !== undefined) { //单个上传
		const item = this[index];
		return upload(item, index);
	} else { //全部上传，逐个上传
		const sequentialUpload = (index) => {
			upload(this[index], index).finally(() => {
				if (index < this.length - 1) {
					sequentialUpload(index + 1);
				}
			});
		};
		sequentialUpload(0);
	}
};

/**
 * 添加上传文件
 * @param {string} path
 * @param {boolean} isAutoUpload
 * @return {number} index
 */
Uploader.prototype.add = function(path, isAutoUpload = true) {
	const index = this.push({
		state: 0,
		path: path
	}) - 1;
	if (isAutoUpload) this.upload(index);
	return index;
};

/**
 * 移除上传文件
 * @param {number} index
 */
Uploader.prototype.remove = function(index) {
	this.splice(index, 1);
};

/**
 * 获取已上传的文件
 */
Uploader.prototype.getUploadedFiles = function() {
	const result = [];
	this.forEach((item) => {
		if (item.url) result.push(item.url);
	});
	return result;
};

/**
 * 返回数组
 * @return {[]}
 */
Uploader.prototype.toArray = function() {
	return Array.from(this);
};

/**
 * 上传改变事件
 * @param {{file:*,index:number}} res
 */
Uploader.prototype.onUploadChange = null;

export default Uploader;
