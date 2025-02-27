import { request } from "../request";
export default function(options) {
	console.log(request)
	return request.post(Object.assign({
		url: options.url
	}, options, {
		filePath: options.file
	})).then(options.onUploadedSuccess || function(res) {
		return {
			url: res.data.picture_url,
			picture_id: res.data.picture_id,
		};
	});
}
