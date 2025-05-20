<template>
	<view style="background-color:#36395A;">
		<custom-audio-player :list="audios" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				audios: [{
						title: "我们都一样",
						singer: "张杰",
						epname: "杰哥精选",
						coverImgUrl: "https://7465-test01-632ffe-1258717418.tcb.qcloud.la/personal/player/images/jie02.jpg?sign=00e5e68d81145037000a162e2220736a&t=1556345760",
						src: "https://7465-test01-632ffe-1258717418.tcb.qcloud.la/personal/player/song/%E6%88%91%E4%BB%AC%E9%83%BD%E4%B8%80%E6%A0%B7%20-%20%E5%BC%A0%E6%9D%B0.mp3?sign=008d62b6bea06a8a6814b5f284fac0ac&t=1556345730"
					},
					{
						title: "明天过后",
						singer: "张杰",
						epname: "杰哥精选",
						coverImgUrl: "https://7465-test01-632ffe-1258717418.tcb.qcloud.la/personal/player/images/jie01.jpg?sign=0d4ea8bb72553d22404e2fe8d3866d05&t=1556206405",
						src: "https://7465-test01-632ffe-1258717418.tcb.qcloud.la/personal/player/song/%E6%98%8E%E5%A4%A9%E8%BF%87%E5%90%8E%20-%20%E5%BC%A0%E6%9D%B0.mp3?sign=ffdea83268ce7f0eb76e70f514a9fa44&t=1556119851"
					}
				]
			}
		}
	}
</script>

<style>
</style>
