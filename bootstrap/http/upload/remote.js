export default function(options) {
	const filepath = options.filepath = typeof options.file === 'string' ? options.file : options.file.path;
	options = Object.assign(options, {
		filePath: filepath,
		returnRaw: true,
		successTips: false
	});
	return uni.$http.post(options.url, options.data, options).then(function(res) {
		return options.onUploadedSuccess ?
			options.onUploadedSuccess(res.data) : res.data.data;
	});
}
