<template>
	<view class="cu-bar search bg-white">
		<view class="search-form round">
			<text class="cuIcon-search"></text>
			<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索图片、文章、视频"
				   confirm-type="search"></input>
		</view>
		<view class="action">
			<button class="cu-btn shadow-blur round">搜索</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "custom-search",
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>
