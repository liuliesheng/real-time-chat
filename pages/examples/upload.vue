<template>
	<div class="upload">
		<view class='container'>
			<button @tap='onChooseImage'>选择图片</button>
		</view>
		<view class='upload'>
			<view class='upload-item' v-for='(item,index) in files' :key='index'>
				<view class='upload-image'>
					<image mode='aspectFill' :src='item.path' />
				</view>
				<view class='status-text' v-if='item.status===0'>等待上传</view>
				<progress :percent="item.progress" show-info v-if='item.status===1' />
				<view class='status-text status-success' v-if='item.status===2'>上传成功</view>
				<view class='status-text status-error' v-if='item.status===3'>上传失败</view>
			</view>
		</view>
	</div>
</template>

<script>
	export default {
		name: "upload",
		data() {
			return {
				files: []
			};
		},
		methods: {
			/**
			 * 选择图片
			 * @param e
			 */
			onChooseImage: function(e) {
				uni.chooseImage({
					success: (res) => {
						const files = res.tempFilePaths.map(item => ({ path: item, status: 0, progress: 0 }));

						let isUpdated = true;
						const updateView = () => {
							if (!isUpdated) return;
							isUpdated = false;
							//延迟更新，避免小程序抛出异常
							setTimeout(() => {
								isUpdated = true;
								this.files = files;
							}, 200);
						};

						uni.$http.request({
							url: 'upload',
							files: res.tempFilePaths,
							name: 'file',
							// multiple: true,
							success: (res) => {
								const { index, result } = res;
								console.log('file upload', index, 'success', result);
								files[index].status = result.status === 1 ? 2 : 3;
								updateView();
							},
							fail: (res) => {
								const { index, result } = res;
								console.error('file upload', index, 'fail', result);
								files[index].status = 3;
								updateView();
							},
							complete: (res) => {
								const { index, result } = res;
								console.log('file upload', index, 'complete', result);
							},
							start: (res) => {
								const { index, file } = res;
								console.log('file upload', index, 'start', file);
								files[index].status = 1;
								updateView();
							},
							end: (res) => {
								console.log('file upload end', res);
								updateView();
							},
							onProgressUpdate: (res) => {
								const { index, progress } = res;
								files[index].progress = progress.progress;
								updateView();
							}
						});

						updateView();
					}
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.upload {
		overflow: hidden;
	}


	.upload-item {
		float: left;
		padding: 10rpx;
		border: 1rpx solid #ddd;
		width: 33.333333%;
	}

	.upload-item:last-child {}

	.upload-image {
		padding-top: 100%;
		position: relative;
	}

	.upload-item image {
		width: 100%;
		box-sizing: border-box;
		position: absolute;
		top: 0;
		height: 100%;
	}

	.upload-item .status-text,
	.upload-item progress {}

	.upload-item .status-text {
		line-height: 1.2;
		color: #474747;
	}

	.status-text.status-success {
		color: green;
	}

	.status-text.status-error {
		color: salmon;
	}
</style>
