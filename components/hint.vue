<template>
	<view v-show="showMsg" class="hint padding text-center shadow-blur animated"
			:class="{
				'bg-gradual-red': showType !== 'success',
				'bg-gradual-green': showType === 'success',
				slideInDown: isShow,
				slideOutUp: !isShow
			}">
		{{showMsg}}
	</view>
</template>

<script>
// const successAudioContext = uni.createInnerAudioContext();
// successAudioContext.src = uni.$config.successTipsAudio;
// const failAudioContext = uni.createInnerAudioContext();
// failAudioContext.src = uni.$config.failTipsAudio;
export default {
	data() {
		return {
			showMsg: '',
			isShow: 0,
			showType: 'error',
			timeId: 0
		}
	},
	created: function() {
		this.$root.hintError = this.hintError;
		this.$root.hintSuccess = this.hintSuccess;
	},
	methods: {
		hint: function(type, msg) {
			const handler = () => {
				this.showMsg = msg;
				this.showType = type;
				this.isShow = 1;

				this.autoClose();
			};

			if (this.isShow) {
				this.isShow = 0;
				setTimeout(handler, 100);
			} else {
				handler();
			}
		},

		hintError: function(msg) {
			this.hint('error', msg);
			// failAudioContext.play();
		},

		hintSuccess: function(msg) {
			this.hint('success', msg);
			// successAudioContext.play();
		},

		autoClose: function() {
			clearTimeout(this.timeId);
			this.timeId = setTimeout(() => {
				this.isShow = 0;
			}, 1500);
		}
	}
}
</script>

<style>
	.hint {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 2000;
	}
</style>
