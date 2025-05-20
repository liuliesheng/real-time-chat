<template>
	<view style="background-color:#F6F7F8;" @tap.stop.prevent="stopfun">
		<text class="keyboard-res block" v-if="showInputRes"
			  :style="{color:resultColor, fontSize:resultSize}">{{resVal}}</text>
		<view class="keyboard flex justify-between">
			<view class="keyboard-left flex flex-wrap justify-between">
				<text v-for="(item, index) in [1,2,3,4,5,6,7,8,9]" :key="index"
					  class="keyboard-keys block"
					  :data-keynumber="item"
					  @tap.stop="inputNow">{{item}}</text>

				<text class="keyboard-keys block"
					  :style="{
						width: isPoint ? '64%':'100%',
					}"
					  data-keynumber="0" @tap.stop="inputNow">0</text>

				<text v-if="isPoint" class="keyboard-keys"
					  :style="{
						width:'30%',
					}"
					  data-keynumber="." @tap.stop="inputNow">.</text>
			</view>
			<view class="keyboard-right flex flex-direction align-center">
				<text class="keyboard-keys cuIcon-backdelete block"
					  :data-keynumber="-3" @tap.stop="deleteNow"></text>
				<text class="keyboard-keys keyboard-done block"
					  @tap.stop="done">{{doneBtnName}}</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "custom-number-keyboard",
		props: {
			canCloseByShade: { type: Boolean, default: false },
			doneBtnName: { type: String, default: "完成" },
			isPoint: { type: Boolean, default: true },
			value: { type: String, default: '' },
			showInputRes: { type: Boolean, default: true },
			resultColor: { type: String, default: '#2B2E3D' },
			resultSize: { type: String, default: '32rpx' },
			// tapBgColor: { type: String, default: '#008AFF' },
		},
		methods: {
			open: function() {
				this.$refs.guipopupfornk.open();
			},
			close: function() {
				this.$refs.guipopupfornk.close();
			},
			stopfun: function(e) {
				e.stopPropagation();
				return;
			},
			inputNow: function(e) {
				var k = e.currentTarget.dataset.keynumber;
				this.resVal += k + '';
				this.tapIndex = k;
				this.$emit('keyboardInput', k);
			},
			deleteNow: function(e) {
				var k = e.currentTarget.dataset.keynumber;
				this.tapIndex = k;
				this.resVal = this.resVal.substring(0, this.resVal.length - 1);
				this.$emit('keyboardDelete');
			},
			done: function() {
				this.$emit('keyboardDone');
			},
			setVal: function(val) {
				this.resVal = val;
			},
		},
		data() {
			return {
				resVal: '',
				tapIndex: -1
			}
		},
		created: function() {
			this.resVal = this.value + '';
		},
		watch: {
			value: function(val) {
				this.resVal = val + '';
			}
		}
	}
</script>
<style>
	.keyboard {
		background-color: #F6F7F8;
		padding: 20rpx 0;
	}

	.keyboard-body {
		flex-direction: row;
		justify-content: space-between;
		padding: 10px 0;
	}

	.keyboard-left {
		/* width: 560rpx; */
		flex: 1;
	}

	.keyboard-right {
		width: 188rpx;
	}

	.keyboard-keys {
		/* width: 166rpx; */
		width: 30%;
		height: 100rpx;
		margin: 10rpx;
		background-color: #FFFFFF;
		text-align: center;
		line-height: 100rpx;
		border-radius: 8rpx;
		font-weight: 700;
		font-size: 50rpx;
		transition: all 0.2s;
	}

	.keyboard-keys:active {
		opacity: .6;
		/* background-color: rgba(255, 255, 255, 0.6); */
		/* background-color: #3688FF; */
		/* color: #FFFFFF; */
	}

	.keyboard-right .keyboard-keys {
		width: 80%;
	}

	.keyboard-done {
		height: 340rpx;
		line-height: 340rpx;
		font-size: 36rpx;
		font-weight: 400;
		color: #FFFFFF;
		background-color: #008AFF;
	}

	.keyboard-res {
		line-height: 60rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		padding-top: 20rpx;
	}
</style>
