<template>
	<view class="timer">
		{{datetime}}
	</view>
</template>

<script>
function timer(handler) {
	let id = 0;
	return {
		start: function() {
			//如果计时器已开启，则直接返回，避免申请过多的计时器，造成内存泄露
			if (id) return;

			id = setInterval(handler, 1000);

			//立即执行一下，避免出现时间间隔
			handler();
			console.log('timer start...');
		},
		stop: function() {
			if (id) {
				clearInterval(id);
				console.log('timer stop...');
			}

			//销毁后要重置为 0
			id = 0;
		},
	}
}

export default {
	name: "timer",
	data() {
		return {
			datetime: uni.$.timeUtil.format()
		};
	},
	timer: null,

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.$options.timer = timer(() => {
			this.datetime = uni.$.timeUtil.format();
		})
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		this.$options.timer.start();
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {
		this.$options.timer.stop();
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {
		this.$options.timer.stop();
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.timer {
		text-align: center;
		color: #f35626;
		background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: hue 60s infinite linear;
		font-size: 24px;
		line-height: 1.2;
		padding-top: 100px;
		transition: all 0.2s;
	}

	@-webkit-keyframes hue {
		from {
			-webkit-filter: hue-rotate(0deg);
		}

		to {
			-webkit-filter: hue-rotate(-360deg);
		}
	}
</style>
