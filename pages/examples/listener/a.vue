<template>
	<div class="a">
		<view class="container">
			等待触发结果:
			<text style="color:red">{{ result }}</text>
		</view>
		<button @tap="toBPage">子页面</button>
	</div>
</template>

<script>
export default {
	name: 'a',
	data() {
		return {
			result: null
		};
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		console.log(this);
		uni.$emitter.on('wait.result', res => {
			this.result = JSON.stringify(res);
		});
	},

	methods: {
		toBPage: function() {
			uni.navigateTo({
				url: './b'
			});
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.a {
	}

	page {
		padding: 30upx;
	}
</style>
