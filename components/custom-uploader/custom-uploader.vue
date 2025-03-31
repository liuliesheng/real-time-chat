<template>
	<view class="grid col-4 grid-square flex-sub">
		<view class="bg-img" v-for="(item,index) in list" :key="index" @tap="onViewImage"
		      :data-url="list[index].path||list[index].url">
			<image :src="list[index].path||list[index].url" mode="aspectFill"></image>
			<view class="cu-tag bg-red" @tap.stop="onDelImg" :data-index="index">
				<text class='cuIcon-close'></text>
			</view>
			<view class="state" v-if="item.state!==1">
				<text v-if="item.state===0">上传中</text>
				<text v-else-if="item.state===2">上传失败</text>
			</view>
		</view>
		<view class="solids" @tap="oChooseImage" v-if="list.length<9">
			<text class='cuIcon-cameraadd'></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						path: "blob:http://localhost:8080/c64977bd-cbd1-4580-8b0d-94fbe33bb3cc",
						state: 0,
					},
					{
						url: "blob:http://localhost:8080/c95d8db0-8cb0-473f-a6c7-3ca66c2e5a4c",
						state: 1,
					},
					{
						path: "blob:http://localhost:8080/d7772fe4-fe84-40e1-9c1a-e7b686fc49cb",
						state: 2,
					}
				]
			};
		},
		methods: {
			oChooseImage() {
				uni.chooseImage({
					count: 9 - this.list.length,
					success: (res) => {
						this.list = this.list.concat(res.tempFilePaths.map(it => {
							return {
								path: it,
								state: 0
							};
						}));
						console.log(this.list)
					}
				});
			},

			onViewImage(e) {
				uni.previewImage({
					urls: this.list.map(it => it.path || it.url),
					current: e.currentTarget.dataset.url
				});
			},

			onDelImg(e) {
				uni.showModal({
					content: '确定要删除这张图片吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.cancel) {
							return;
						}

						this.list.splice(e.currentTarget.dataset.index, 1)
					}
				})
			},
		}
	}
</script>

<style>
	.bg-img {
		position: relative;
	}

	.bg-img .state {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;

		background-color: rgba(0, 0, 0, 0.3);
		color: white;
		text-align: center;
		font-size: 10px;
		line-height: 1.6;
	}
</style>
