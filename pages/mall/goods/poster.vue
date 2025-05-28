<template>
	<custom-page class="page" :loaded="true">
		<view class="margin">
			<button class="cu-btn block lg round bg-red" @tap="saveTap">立即保存</button>
		</view>
	</custom-page>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			// 立即保存
			saveTap() {
				console.log('sss')
				// #ifdef H5
				// 直接跳转图片地址
				Location.href = '';
				// #endif
				// #ifndef H5
				uni.$promise.getImageInfo().then((res) => {
					return uni.$promise.saveImageToPhotosAlbum({
						filePath: res.path
					});
				});
				// #endif
			}
		}
	}
</script>

<style>

</style>
