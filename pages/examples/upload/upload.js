// pages/examples/upload/upload.js
const {urls} = wx.config;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		files: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},

	/**
	 * 选择图片
	 * @param e
	 */
	onChooseImage: function(e) {
		wx.chooseImage({
			success: (res) => {
				const files = res.tempFilePaths.map(item => ({path: item, status: 0, progress: 0}));

				let isUpdated = true;
				const updateView = () => {
					if (!isUpdated) return;
					isUpdated = false;
					//延迟更新，避免小程序抛出异常
					setTimeout(() => {
						isUpdated = true;
						this.setData({files: files});
					}, 200);
				};

				wx.http.upload({
					url: urls.upload,
					files: res.tempFilePaths,
					name: 'download',
					// multiple: true,
					success: (res) => {
						const {index, result} = res;
						console.log('file upload', index, 'success', result);
						files[index].status = result.status === 1 ? 2 : 3;
						updateView();
					},
					fail: (res) => {
						const {index, result} = res;
						console.error('file upload', index, 'fail', result);
						files[index].status = 3;
						updateView();
					},
					complete: (res) => {
						const {index, result} = res;
						console.log('file upload', index, 'complete', result);
					},
					start: (res) => {
						const {index, file} = res;
						console.log('file upload', index, 'start', file);
						files[index].status = 1;
						updateView();
					},
					end: (res) => {
						console.log('file upload end', res);
						updateView();
					},
					onProgressUpdate: (res) => {
						const {index, progress} = res;
						files[index].progress = progress.progress;
						updateView();
					}
				});
			}
		});
	}

});
