import { request } from "../request";
export default function(options) {
	options = Object.assign(options, {
		filePath: options.file
	});
	return request.post(options.url, options, {
		returnRaw: true
	}).then(function(res) {
		return options.onUploadedSuccess ?
			options.onUploadedSuccess(res.data) : res.data.data;
	});
}
