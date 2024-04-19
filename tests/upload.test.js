import http from "../bootstrap/request";

setTimeout(() => {
	wx.chooseImage({
		success: (res) => {
			console.log(res.tempFilePaths);
			http.upload({
				api: '?s=/home/file/uploadPicture',
				files: res.tempFilePaths,
				name: 'file',
				success: (index, res) => {
					console.log('file upload', index, 'success', res);
				},
				fail: (index, err) => {
					console.error('file upload', index, 'fail', err);
				},
				end: (res) => {
					console.log('file upload end', res);
				},
				onProgressUpdate: (index, progress) => {
					console.log('file upload', index, 'progress', progress);
				}
			});
		}
	});
}, 1000);
